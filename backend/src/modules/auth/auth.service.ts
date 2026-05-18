import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../../common/services/email.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password from returned user
    const { passwordHash, ...result } = user;
    void passwordHash;
    return result;
  }

  async login(user: any) {
    // Update last login timestamp
    await this.usersService.updateLastLogin(user.id);

    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }) {
    const existingUser = await this.usersService.findByEmail(userData.email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    const user = await this.usersService.create({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      passwordHash,
      role: userData.role || 'BUYER',
    });

    // Return login response with token
    return this.login(user);
  }

  async socialLogin(profile: {
    provider: 'google' | 'apple' | 'linkedin' | 'microsoft';
    providerId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    const { provider, providerId } = profile;

    let user: any;
    if (provider === 'google') {
      user = await this.usersService.findByGoogleId(providerId);
    } else if (provider === 'apple') {
      user = await this.usersService.findByAppleId(providerId);
    } else if (provider === 'linkedin') {
      user = await this.usersService.findByLinkedinId(providerId);
    } else if (provider === 'microsoft') {
      user = await this.usersService.findByMicrosoftId(providerId);
    }

    if (!user && profile.email) {
      user = await this.usersService.findByEmail(profile.email);
    }

    if (!user) {
      const fallbackEmail =
        profile.email || `${provider}-${providerId}@social.local`;

      user = await this.usersService.create({
        email: fallbackEmail,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: 'BUYER',
        emailVerified: true,
        googleId: provider === 'google' ? providerId : undefined,
        appleId: provider === 'apple' ? providerId : undefined,
        linkedinId: provider === 'linkedin' ? providerId : undefined,
        microsoftId: provider === 'microsoft' ? providerId : undefined,
      });
    } else {
      await this.usersService.update(user.id, {
        firstName: user.firstName || profile.firstName,
        lastName: user.lastName || profile.lastName,
        googleId: provider === 'google' ? providerId : user.googleId,
        appleId: provider === 'apple' ? providerId : user.appleId,
        linkedinId: provider === 'linkedin' ? providerId : user.linkedinId,
        microsoftId: provider === 'microsoft' ? providerId : user.microsoftId,
      });

      user = await this.usersService.findById(user.id);
    }

    return this.login(user);
  }

  async validateJwtPayload(payload: any) {
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return user without password hash
    const { passwordHash, ...userWithoutPassword } = user;
    void passwordHash;
    return userWithoutPassword;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    // Always return success to prevent email enumeration attacks
    if (!user) return;

    // Generate a cryptographically secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');
    // Store a SHA-256 hash — the plain token travels only in the email link
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.usersService.update(user.id, {
      resetPasswordToken: tokenHash,
      resetPasswordTokenExpiry: expiry,
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;

    await this.emailService.sendEmail({
      to: user.email,
      subject: 'Reset your Raxie Zenith Estate password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1C1A17; color: #C9A96A; padding: 24px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f8f6f3; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #C9A96A; color: #1C1A17; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; color: #7A6E60; font-size: 12px; margin-top: 24px; }
              .warning { background: #fff3cd; border-left: 4px solid #C9A96A; padding: 12px; margin: 16px 0; font-size: 13px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header"><h1>Raxie Zenith Estate</h1></div>
              <div class="content">
                <h2>Password Reset Request</h2>
                <p>Hello ${user.firstName || 'there'},</p>
                <p>We received a request to reset the password for the account associated with <strong>${user.email}</strong>.</p>
                <p>Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
                <a href="${resetUrl}" class="button">Reset My Password</a>
                <div class="warning">If you did not request a password reset, please ignore this email. Your password will not change.</div>
                <p>If the button does not work, copy and paste this link into your browser:</p>
                <p style="word-break:break-all; font-size:12px; color:#5F5448;">${resetUrl}</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Raxie Zenith Estate. All rights reserved.</p>
                <p>1 Mayfair Court, London, W1K 2AB</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Reset your password by visiting: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you did not request this, please ignore this email.`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!token || token.length !== 64) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.usersService.findByResetToken(tokenHash);

    if (!user || !user.resetPasswordTokenExpiry || user.resetPasswordTokenExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await this.usersService.update(user.id, {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    });
  }
}
