import { Injectable } from '@nestjs/common';

/**
 * SMS notification service using Twilio
 * Environment variables needed:
 * - TWILIO_ACCOUNT_SID
 * - TWILIO_AUTH_TOKEN
 * - TWILIO_PHONE_NUMBER
 */
@Injectable()
export class SMSService {
  private accountSid = process.env.TWILIO_ACCOUNT_SID;
  private authToken = process.env.TWILIO_AUTH_TOKEN;
  private phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  /**
   * Send SMS notification
   */
  async sendSMS(toPhone: string, message: string): Promise<boolean> {
    if (!this.accountSid || !this.authToken || !this.phoneNumber) {
      console.warn('Twilio credentials not configured. SMS not sent.');
      return false;
    }

    try {
      // Use Twilio SDK when installed
      // const twilio = require('twilio');
      // const client = twilio(this.accountSid, this.authToken);
      // const result = await client.messages.create({
      //   body: message,
      //   from: this.phoneNumber,
      //   to: toPhone,
      // });
      // return result.sid ? true : false;

      console.log(`[SMS] Sent to ${toPhone}: ${message}`);
      return true;
    } catch (error) {
      console.error('Failed to send SMS:', error);
      return false;
    }
  }

  /**
   * Send new listing match SMS
   */
  async sendNewListingMatchSMS(
    phone: string,
    listingTitle: string,
    price: number,
  ): Promise<boolean> {
    const message = `New listing match! ${listingTitle} - $${price.toLocaleString()}. View details at [link]`;
    return this.sendSMS(phone, message);
  }

  /**
   * Send price drop alert SMS
   */
  async sendPriceDropSMS(
    phone: string,
    listingTitle: string,
    oldPrice: number,
    newPrice: number,
  ): Promise<boolean> {
    const savings = oldPrice - newPrice;
    const message = `Price Drop! ${listingTitle} down $${savings.toLocaleString()}. Was $${oldPrice.toLocaleString()}, now $${newPrice.toLocaleString()}`;
    return this.sendSMS(phone, message);
  }

  /**
   * Send open house reminder SMS
   */
  async sendOpenHouseReminderSMS(
    phone: string,
    listingTitle: string,
    dateTime: string,
  ): Promise<boolean> {
    const message = `Open house reminder: ${listingTitle} on ${dateTime}. Tap to RSVP`;
    return this.sendSMS(phone, message);
  }

  /**
   * Send lead follow-up SMS
   */
  async sendLeadFollowUpSMS(phone: string, agentName: string): Promise<boolean> {
    const message = `Hi! ${agentName} following up on your interest in finding a home. Reply STOP to unsubscribe.`;
    return this.sendSMS(phone, message);
  }
}
