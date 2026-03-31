import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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
    provider: 'google' | 'apple';
    providerId: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }) {
    const { provider, providerId } = profile;

    let user: any =
      provider === 'google'
        ? await this.usersService.findByGoogleId(providerId)
        : await this.usersService.findByAppleId(providerId);

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
      });
    } else {
      await this.usersService.update(user.id, {
        firstName: user.firstName || profile.firstName,
        lastName: user.lastName || profile.lastName,
        googleId: provider === 'google' ? providerId : user.googleId,
        appleId: provider === 'apple' ? providerId : user.appleId,
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
}
