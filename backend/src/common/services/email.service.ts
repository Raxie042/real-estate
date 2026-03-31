import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure transporter - use environment variables in production
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(options: { to: string; subject: string; html: string; text?: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"Real Estate Platform" <noreply@realestate.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log('Email sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPropertyInquiry(data: {
    recipientEmail: string;
    recipientName: string;
    inquirerName: string;
    inquirerEmail: string;
    inquirerPhone?: string;
    propertyTitle: string;
    propertyId: string;
    message: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .property { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Property Inquiry</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>You have received a new inquiry for your property:</p>
              
              <div class="property">
                <h2 style="color: #C9A96A; margin-top: 0;">${data.propertyTitle}</h2>
                <p><strong>From:</strong> ${data.inquirerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.inquirerEmail}">${data.inquirerEmail}</a></p>
                ${data.inquirerPhone ? `<p><strong>Phone:</strong> ${data.inquirerPhone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p style="background: #f8f6f3; padding: 15px; border-radius: 6px;">${data.message}</p>
              </div>

              <p>You can respond directly to ${data.inquirerEmail} or view your listing for more details.</p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/properties/${data.propertyId}" class="button">
                View Property
              </a>

              <div class="footer">
                <p>This is an automated message from Real Estate Platform</p>
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `New inquiry for ${data.propertyTitle}`,
      html,
      text: `Hello ${data.recipientName},\n\nYou have received a new inquiry from ${data.inquirerName} (${data.inquirerEmail}) for your property "${data.propertyTitle}".\n\nMessage: ${data.message}`,
    });
  }

  async sendSavedSearchAlert(data: {
    recipientEmail: string;
    recipientName: string;
    searchName: string;
    matchingListings: Array<{
      id: string;
      title: string;
      price: number;
      currency: string;
      city: string;
      bedrooms?: number;
      bathrooms?: number;
    }>;
  }) {
    const listingsHtml = data.matchingListings
      .map(
        (listing) => `
      <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid #C9A96A;">
        <h3 style="margin: 0 0 10px 0; color: #2B2620;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/properties/${listing.id}" style="color: #C9A96A; text-decoration: none;">
            ${listing.title}
          </a>
        </h3>
        <p style="margin: 5px 0; color: #5F5448;">
          <strong style="color: #C9A96A; font-size: 18px;">${listing.currency} ${listing.price.toLocaleString()}</strong>
        </p>
        <p style="margin: 5px 0; color: #7A6E60; font-size: 14px;">
          ${listing.city} ${listing.bedrooms ? `• ${listing.bedrooms} bed` : ''} ${listing.bathrooms ? `• ${listing.bathrooms} bath` : ''}
        </p>
      </div>
    `,
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Properties Match Your Search!</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>We found ${data.matchingListings.length} new ${data.matchingListings.length === 1 ? 'property' : 'properties'} matching your saved search "<strong>${data.searchName}</strong>":</p>
              
              <div style="margin: 20px 0;">
                ${listingsHtml}
              </div>

              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/saved-searches" 
                   style="display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">
                  View All Matches
                </a>
              </p>

              <div class="footer">
                <p>You're receiving this because you enabled alerts for this saved search</p>
                <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/saved-searches" style="color: #C9A96A;">Manage your saved searches</a></p>
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `${data.matchingListings.length} new ${data.matchingListings.length === 1 ? 'property matches' : 'properties match'} your search "${data.searchName}"`,
      html,
    });
  }

  async sendPriceChangeAlert(data: {
    recipientEmail: string;
    recipientName: string;
    propertyTitle: string;
    propertyId: string;
    oldPrice: number;
    newPrice: number;
    currency: string;
  }) {
    const priceChange = data.newPrice - data.oldPrice;
    const percentChange = ((priceChange / data.oldPrice) * 100).toFixed(1);
    const isIncreased = priceChange > 0;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, ${isIncreased ? '#e74c3c' : '#27ae60'} 0%, ${isIncreased ? '#c0392b' : '#229954'} 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .price-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Price ${isIncreased ? 'Increased' : 'Reduced'}!</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>The price for a property in your favorites has changed:</p>
              
              <div class="price-box">
                <h2 style="margin: 0 0 20px 0; color: #2B2620;">${data.propertyTitle}</h2>
                <p style="margin: 10px 0; color: #7A6E60; text-decoration: line-through;">
                  Old Price: ${data.currency} ${data.oldPrice.toLocaleString()}
                </p>
                <p style="margin: 10px 0; color: ${isIncreased ? '#e74c3c' : '#27ae60'}; font-size: 24px; font-weight: bold;">
                  New Price: ${data.currency} ${data.newPrice.toLocaleString()}
                </p>
                <p style="margin: 10px 0; color: #5F5448; font-size: 18px;">
                  ${isIncreased ? '↑' : '↓'} ${Math.abs(priceChange).toLocaleString()} (${percentChange}%)
                </p>
              </div>

              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/properties/${data.propertyId}" class="button">
                  View Property
                </a>
              </p>

              <div class="footer">
                <p>You're receiving this because this property is in your favorites</p>
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `Price ${isIncreased ? 'Increased' : 'Reduced'}: ${data.propertyTitle}`,
      html,
    });
  }

  // Offer notification
  async sendOfferNotification(data: {
    recipientEmail: string;
    recipientName: string;
    status: 'NEW' | 'ACCEPTED' | 'REJECTED' | 'COUNTERED';
    offerPrice: number;
    propertyTitle: string;
    propertyId: string;
    buyerName: string;
    currency: string;
  }) {
    const statusMessages = {
      NEW: `You have received a new offer of ${data.currency} ${data.offerPrice.toLocaleString()} on ${data.propertyTitle}`,
      ACCEPTED: `Your offer of ${data.currency} ${data.offerPrice.toLocaleString()} has been accepted!`,
      REJECTED: `Your offer of ${data.currency} ${data.offerPrice.toLocaleString()} has been rejected`,
      COUNTERED: `A counter offer has been made on ${data.propertyTitle}`,
    };

    const statusColors = {
      NEW: '#3498db',
      ACCEPTED: '#27ae60',
      REJECTED: '#e74c3c',
      COUNTERED: '#f39c12',
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, ${statusColors[data.status]} 0%, ${statusColors[data.status]}cc 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .offer-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusColors[data.status]}; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Offer ${data.status}</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>${statusMessages[data.status]}</p>
              
              <div class="offer-box">
                <h3 style="margin: 0 0 15px 0; color: #2B2620;">${data.propertyTitle}</h3>
                <p style="margin: 10px 0; color: #5F5448;"><strong>Offer Amount:</strong> ${data.currency} ${data.offerPrice.toLocaleString()}</p>
                <p style="margin: 10px 0; color: #5F5448;"><strong>From:</strong> ${data.buyerName}</p>
                <p style="margin: 10px 0; color: #5F5448;"><strong>Status:</strong> <span style="color: ${statusColors[data.status]}; font-weight: bold;">${data.status}</span></p>
              </div>

              <p>Log in to your account to review and respond to this offer.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/offers" class="button">
                  View Offers
                </a>
              </p>

              <div class="footer">
                <p>This is an automated message from Real Estate Platform</p>
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `Offer ${data.status}: ${data.propertyTitle}`,
      html,
    });
  }

  // Open House RSVP confirmation
  async sendOpenHouseRsvpConfirmation(data: {
    recipientEmail: string;
    recipientName: string;
    propertyTitle: string;
    propertyId: string;
    openHouseDate: Date;
    agentName: string;
    agentPhone: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Open House RSVP Confirmed</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>Thank you for confirming your attendance to the open house for:</p>
              
              <div class="info-box">
                <h2 style="margin: 0 0 20px 0; color: #C9A96A;">${data.propertyTitle}</h2>
                <p style="margin: 10px 0; color: #5F5448;"><strong>📅 Date & Time:</strong> ${data.openHouseDate.toLocaleString()}</p>
                <p style="margin: 10px 0; color: #5F5448;"><strong>👤 Agent:</strong> ${data.agentName}</p>
                <p style="margin: 10px 0; color: #5F5448;"><strong>📞 Phone:</strong> <a href="tel:${data.agentPhone}">${data.agentPhone}</a></p>
              </div>

              <p style="color: #7A6E60;">If you need to cancel or have questions, please contact the agent directly.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/properties/${data.propertyId}" class="button">
                  View Property Details
                </a>
              </p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `Open House Confirmed: ${data.propertyTitle}`,
      html,
    });
  }

  // Document shared notification
  async sendDocumentSharedNotification(data: {
    recipientEmail: string;
    recipientName: string;
    documentName: string;
    senderName: string;
    propertyTitle?: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .doc-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A96A; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📄 Document Shared</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p><strong>${data.senderName}</strong> has shared a document with you:</p>
              
              <div class="doc-box">
                <p style="margin: 0 0 10px 0; color: #C9A96A; font-size: 16px; font-weight: bold;">📎 ${data.documentName}</p>
                ${data.propertyTitle ? `<p style="margin: 0; color: #7A6E60; font-size: 14px;">Related to: ${data.propertyTitle}</p>` : ''}
              </div>

              <p>Log in to your account to view and download this document.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/documents" class="button">
                  View Document
                </a>
              </p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `Document Shared: ${data.documentName}`,
      html,
    });
  }

  // New message notification
  async sendMessageNotification(data: {
    recipientEmail: string;
    recipientName: string;
    senderName: string;
    messagePreview: string;
    propertyTitle?: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .msg-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #C9A96A; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">💬 New Message</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p><strong>${data.senderName}</strong> sent you a message${data.propertyTitle ? ` about ${data.propertyTitle}` : ''}:</p>
              
              <div class="msg-box">
                <p style="margin: 0; color: #5F5448; font-style: italic;">"${data.messagePreview}..."</p>
              </div>

              <p>Reply to continue the conversation.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/messages" class="button">
                  Reply Now
                </a>
              </p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `New Message from ${data.senderName}`,
      html,
    });
  }

  // Listing approved notification
  async sendListingApprovedNotification(data: {
    recipientEmail: string;
    recipientName: string;
    propertyTitle: string;
    propertyId: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .success-box { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #27ae60; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✅ Listing Approved</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>Congratulations! Your listing has been approved and is now live on our platform:</p>
              
              <div class="success-box">
                <h2 style="margin: 0; color: #27ae60;">${data.propertyTitle}</h2>
              </div>

              <p>Your property is now visible to potential buyers and agents. You can start receiving inquiries and offers.</p>
              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/properties/${data.propertyId}" class="button">
                  View Your Listing
                </a>
              </p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `Listing Approved: ${data.propertyTitle}`,
      html,
    });
  }

  async sendInvitationApplicationReceived(data: {
    recipientEmail: string;
    recipientName: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C9A96A 0%, #B78F4A 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Application Received</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>Thank you for applying for invitation access.</p>

              <div class="info-box">
                <p style="margin: 0; color: #5F5448;">
                  Our team is now reviewing your application. We will email you as soon as a decision is made.
                </p>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: 'Invitation Access Application Received',
      html,
    });
  }

  async sendInvitationApplicationAdminAlert(data: {
    recipientEmail: string;
    applicantName: string;
    applicantEmail: string;
    phone?: string;
    company?: string;
    market?: string;
    portfolioSize?: string;
    message?: string;
  }) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1C1A17 0%, #2B2620 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .label { color: #7A6E60; font-size: 12px; text-transform: uppercase; letter-spacing: 0.6px; margin: 0 0 4px 0; }
            .value { color: #2B2620; margin: 0 0 12px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Invitation Application</h1>
            </div>
            <div class="content">
              <div class="info-box">
                <p class="label">Applicant</p>
                <p class="value">${data.applicantName}</p>

                <p class="label">Email</p>
                <p class="value">${data.applicantEmail}</p>

                ${data.phone ? `<p class="label">Phone</p><p class="value">${data.phone}</p>` : ''}
                ${data.company ? `<p class="label">Company</p><p class="value">${data.company}</p>` : ''}
                ${data.market ? `<p class="label">Market</p><p class="value">${data.market}</p>` : ''}
                ${data.portfolioSize ? `<p class="label">Portfolio Size</p><p class="value">${data.portfolioSize}</p>` : ''}
                ${data.message ? `<p class="label">Message</p><p class="value">${data.message}</p>` : ''}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: `New Invitation Application: ${data.applicantName}`,
      html,
    });
  }

  async sendInvitationDecision(data: {
    recipientEmail: string;
    recipientName: string;
    status: 'APPROVED' | 'REJECTED';
    adminNotes?: string;
  }) {
    const isApproved = data.status === 'APPROVED';
    const title = isApproved ? 'Invitation Approved' : 'Invitation Application Update';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, ${isApproved ? '#27ae60' : '#C9A96A'} 0%, ${isApproved ? '#229954' : '#B78F4A'} 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
            .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; background: #C9A96A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">${title}</h1>
            </div>
            <div class="content">
              <p>Hello ${data.recipientName},</p>
              <p>
                ${isApproved
                  ? 'Your invitation application has been approved. You can now access your account and continue with onboarding.'
                  : 'Your invitation application has been reviewed. At this time, we are unable to proceed with access.'}
              </p>

              ${data.adminNotes ? `<div class="info-box"><p style="margin: 0;"><strong>Notes from our team:</strong><br/>${data.adminNotes}</p></div>` : ''}

              ${isApproved ? `<p style="text-align: center;"><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="button">Sign In</a></p>` : ''}

              <div class="footer">
                <p>© ${new Date().getFullYear()} Real Estate Platform. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: data.recipientEmail,
      subject: isApproved ? 'Your Invitation Has Been Approved' : 'Invitation Application Status Update',
      html,
    });
  }
}
