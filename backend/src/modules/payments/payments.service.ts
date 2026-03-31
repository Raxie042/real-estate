import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Currency, PaymentStatus, SubscriptionPlan } from '@prisma/client';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

type StripeSubscriptionWithPeriod = Stripe.Subscription & {
  current_period_start: number;
  current_period_end: number;
};

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  private ensureStripeConfigured() {
    const key = process.env.STRIPE_SECRET_KEY || '';
    const looksInvalid =
      !key || key.startsWith('your_') || key.includes('stripe_secret_key') || !key.startsWith('sk_');

    if (looksInvalid) {
      throw new ServiceUnavailableException('Stripe payments are not configured');
    }
  }

  private ensureConfiguredPriceId(value: string | undefined, plan: SubscriptionPlan) {
    if (!value || value.startsWith('price_') === false || value.includes('plan_id')) {
      throw new ServiceUnavailableException(`Stripe price ID for ${plan} plan is not configured`);
    }
  }

  private isKnownStripePriceId(priceId: string) {
    const configured = [
      process.env.STRIPE_PRICE_FREE,
      process.env.STRIPE_PRICE_BASIC,
      process.env.STRIPE_PRICE_PREMIUM,
      process.env.STRIPE_PRICE_ENTERPRISE,
    ].filter(Boolean) as string[];

    return configured.includes(priceId);
  }

  async createPaymentIntent(data: {
    userId: string;
    amount: number;
    currency?: string;
    description?: string;
    metadata?: any;
  }) {
    this.ensureStripeConfigured();

    const normalizedCurrency = data.currency
      ? (data.currency.toUpperCase() as Currency)
      : Currency.USD;

    // Create Stripe payment intent
    let paymentIntent: Stripe.PaymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100),
        currency: normalizedCurrency.toLowerCase(),
        description: data.description,
        metadata: data.metadata,
      });
    } catch {
      throw new ServiceUnavailableException('Unable to create payment intent with Stripe');
    }

    // Save to database
    return this.prisma.payment.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        currency: normalizedCurrency,
        status: 'PENDING',
        stripePaymentIntentId: paymentIntent.id,
        description: data.description,
        metadata: data.metadata,
      },
    });
  }

  async confirmPayment(paymentIntentId: string) {
    this.ensureStripeConfigured();

    const payment = await this.prisma.payment.findUnique({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Get status from Stripe
    let paymentIntent: Stripe.PaymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch {
      throw new ServiceUnavailableException('Unable to retrieve payment intent from Stripe');
    }

    let status: PaymentStatus = 'PENDING';
    if (paymentIntent.status === 'succeeded') {
      status = 'COMPLETED';
    } else if (paymentIntent.status === 'canceled') {
      status = 'FAILED';
    }

    return this.prisma.payment.update({
      where: { id: payment.id },
      data: { status },
    });
  }

  async getUserPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPaymentById(id: string) {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  // Subscription methods
  async createSubscription(data: { userId: string; plan: SubscriptionPlan; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user already has a subscription
    const existingSubscription = await this.prisma.subscription.findUnique({
      where: { userId: data.userId },
    });

    if (existingSubscription && existingSubscription.status === 'active') {
      throw new BadRequestException('User already has an active subscription');
    }

    this.ensureStripeConfigured();

    // Create or get Stripe customer
    let stripeCustomerId = existingSubscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      let customer: Stripe.Customer;
      try {
        customer = await stripe.customers.create({
          email: data.email,
          metadata: { userId: data.userId },
        });
      } catch {
        throw new ServiceUnavailableException('Unable to create Stripe customer');
      }
      stripeCustomerId = customer.id;
    }

    // Get price based on plan
    const priceId = this.getPriceIdForPlan(data.plan);

    // Create Stripe subscription
    let stripeSubscription: StripeSubscriptionWithPeriod;
    try {
      stripeSubscription = (await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      })) as unknown as StripeSubscriptionWithPeriod;
    } catch {
      throw new ServiceUnavailableException('Unable to create Stripe subscription');
    }

    // Save to database
    if (existingSubscription) {
      return this.prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: {
          plan: data.plan,
          stripeCustomerId,
          stripeSubscriptionId: stripeSubscription.id,
          status: 'active',
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: false,
        },
      });
    } else {
      return this.prisma.subscription.create({
        data: {
          userId: data.userId,
          plan: data.plan,
          stripeCustomerId,
          stripeSubscriptionId: stripeSubscription.id,
          status: 'active',
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        },
      });
    }
  }

  async getUserSubscription(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
    });
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.stripeSubscriptionId) {
      throw new BadRequestException('Stripe subscription ID missing');
    }

    this.ensureStripeConfigured();

    // Cancel in Stripe
    try {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    } catch {
      throw new ServiceUnavailableException('Unable to cancel Stripe subscription');
    }

    // Update database
    return this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true },
    });
  }

  async updateSubscriptionPlan(userId: string, newPlan: SubscriptionPlan) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.stripeSubscriptionId) {
      throw new BadRequestException('Stripe subscription ID missing');
    }

    this.ensureStripeConfigured();

    let stripeSubscription: StripeSubscriptionWithPeriod;
    try {
      stripeSubscription = (await stripe.subscriptions.retrieve(
        subscription.stripeSubscriptionId,
      )) as unknown as StripeSubscriptionWithPeriod;
    } catch {
      throw new ServiceUnavailableException('Unable to retrieve Stripe subscription');
    }

    const newPriceId = this.getPriceIdForPlan(newPlan);

    // Update Stripe subscription
    try {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        items: [
          {
            id: stripeSubscription.items.data[0].id,
            price: newPriceId,
          },
        ],
      });
    } catch {
      throw new ServiceUnavailableException('Unable to update Stripe subscription plan');
    }

    // Update database
    return this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { plan: newPlan },
    });
  }

  async reactivateSubscription(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.stripeSubscriptionId) {
      throw new BadRequestException('Stripe subscription ID missing');
    }

    this.ensureStripeConfigured();

    try {
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: false,
      });
    } catch {
      throw new ServiceUnavailableException('Unable to reactivate Stripe subscription');
    }

    return this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: false },
    });
  }

  async createCheckoutSession(userId: string, priceId: string) {
    this.ensureStripeConfigured();

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!priceId || !this.isKnownStripePriceId(priceId)) {
      throw new BadRequestException('Invalid or unconfigured Stripe price ID');
    }

    const appUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: user.email,
        success_url: `${appUrl}/subscriptions?status=success`,
        cancel_url: `${appUrl}/pricing?status=canceled`,
        metadata: {
          userId,
          plan: this.getPlanForPriceId(priceId),
        },
      });
    } catch {
      throw new ServiceUnavailableException('Unable to create Stripe checkout session');
    }

    return { id: session.id, url: session.url };
  }

  private getPriceIdForPlan(plan: SubscriptionPlan): string {
    // Map your subscription plans to Stripe price IDs
    const priceMap = {
      FREE: process.env.STRIPE_PRICE_FREE || '',
      BASIC: process.env.STRIPE_PRICE_BASIC || '',
      PREMIUM: process.env.STRIPE_PRICE_PREMIUM || '',
      ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE || '',
    };

    const configured = priceMap[plan] || (plan === 'FREE' ? priceMap.FREE : '');
    this.ensureConfiguredPriceId(configured, plan);
    return configured;
  }

  private getPlanForPriceId(priceId: string): SubscriptionPlan {
    const reverseMap: Record<string, SubscriptionPlan> = {
      [process.env.STRIPE_PRICE_FREE || '']: 'FREE',
      [process.env.STRIPE_PRICE_BASIC || '']: 'BASIC',
      [process.env.STRIPE_PRICE_PREMIUM || '']: 'PREMIUM',
      [process.env.STRIPE_PRICE_ENTERPRISE || '']: 'ENTERPRISE',
    };

    return reverseMap[priceId] || 'FREE';
  }

  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await this.handleSubscriptionUpdate(event.data.object as Stripe.Subscription);
        break;
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    await this.prisma.payment.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: 'COMPLETED' },
    });
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    await this.prisma.payment.update({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: 'FAILED' },
    });
  }

  private async handleSubscriptionUpdate(subscription: Stripe.Subscription) {
    const stripeSubscription = subscription as StripeSubscriptionWithPeriod;
    const dbSubscription = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: stripeSubscription.id },
    });

    if (dbSubscription) {
      await this.prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: {
          status: stripeSubscription.status as any,
          currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
          cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
        },
      });
    }
  }
}
