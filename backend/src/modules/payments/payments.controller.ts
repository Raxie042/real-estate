import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Headers,
  RawBodyRequest,
  Req,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import Stripe from 'stripe';
import { Throttle } from '@nestjs/throttler';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { CancelSubscriptionDto } from './dto/cancel-subscription.dto';
import { UpdateSubscriptionPlanDto } from './dto/update-subscription-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsString, Length } from 'class-validator';

class CreateCheckoutSessionDto {
  @IsString()
  @Length(1, 200)
  priceId: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  async createPaymentIntent(@Body() body: CreatePaymentIntentDto, @Request() req) {
    return this.paymentsService.createPaymentIntent({
      ...body,
      userId: req.user.id,
    });
  }

  @Post('confirm/:paymentIntentId')
  @UseGuards(JwtAuthGuard)
  async confirmPayment(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.confirmPayment(paymentIntentId);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserPayments(@Param('userId') userId: string, @Request() req) {
    const isAdmin = req.user?.role === 'ADMIN';
    if (!isAdmin && req.user?.id !== userId) {
      throw new ForbiddenException('Not authorized to access these payments');
    }
    return this.paymentsService.getUserPayments(userId);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  async getCurrentSubscription(@Request() req) {
    return this.paymentsService.getUserSubscription(req.user.id);
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserPaymentHistory(@Request() req) {
    return this.paymentsService.getUserPayments(req.user.id);
  }

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async createCheckoutSession(@Body() body: CreateCheckoutSessionDto, @Request() req) {
    return this.paymentsService.createCheckoutSession(req.user.id, body.priceId);
  }

  // Subscriptions
  @Post('subscriptions')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async createSubscription(@Body() body: CreateSubscriptionDto, @Request() req) {
    return this.paymentsService.createSubscription({
      userId: req.user.id,
      plan: body.plan,
      email: req.user.email,
    });
  }

  @Get('subscriptions/user/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserSubscription(@Param('userId') userId: string, @Request() req) {
    const isAdmin = req.user?.role === 'ADMIN';
    if (!isAdmin && req.user?.id !== userId) {
      throw new ForbiddenException('Not authorized to access this subscription');
    }
    return this.paymentsService.getUserSubscription(userId);
  }

  @Put('subscriptions/cancel')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async cancelSubscription(@Body() _body: CancelSubscriptionDto, @Request() req) {
    return this.paymentsService.cancelSubscription(req.user.id);
  }

  @Delete('subscription')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async cancelCurrentSubscription(@Request() req) {
    return this.paymentsService.cancelSubscription(req.user.id);
  }

  @Put('subscriptions/update-plan')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async updateSubscriptionPlan(@Body() body: UpdateSubscriptionPlanDto, @Request() req) {
    return this.paymentsService.updateSubscriptionPlan(req.user.id, body.newPlan);
  }

  @Post('subscription/reactivate')
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async reactivateCurrentSubscription(@Request() req) {
    return this.paymentsService.reactivateSubscription(req.user.id);
  }

  @Get('payment/:id')
  @UseGuards(JwtAuthGuard)
  async getPayment(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Post('webhook')
  @Throttle({ default: { limit: 300, ttl: 60_000 } })
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    try {
      const event = stripe.webhooks.constructEvent(
        request.rawBody as Buffer,
        signature,
        webhookSecret,
      );

      await this.paymentsService.handleWebhook(event);

      return { received: true };
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw new Error('Webhook signature verification failed');
    }
  }
}
