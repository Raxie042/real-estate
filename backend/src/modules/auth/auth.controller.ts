import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { LinkedinAuthGuard } from './guards/linkedin-auth.guard';
import { MicrosoftAuthGuard } from './guards/microsoft-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

class ResetPasswordDto {
  @IsString()
  @MinLength(64)
  @MaxLength(64)
  token: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Request() req, @Res() res: Response, @Query('state') state?: string) {
    const result = await this.authService.socialLogin(req.user);
    return this.redirectWithToken(res, result.access_token, state);
  }

  @Get('apple')
  @UseGuards(AppleAuthGuard)
  async appleAuth() {
    return;
  }

  @Post('apple/callback')
  @UseGuards(AppleAuthGuard)
  async appleCallbackPost(@Request() req, @Res() res: Response, @Query('state') state?: string) {
    const result = await this.authService.socialLogin(req.user);
    return this.redirectWithToken(res, result.access_token, state);
  }

  @Get('apple/callback')
  @UseGuards(AppleAuthGuard)
  async appleCallbackGet(@Request() req, @Res() res: Response, @Query('state') state?: string) {
    const result = await this.authService.socialLogin(req.user);
    return this.redirectWithToken(res, result.access_token, state);
  }

  @Get('linkedin')
  @UseGuards(LinkedinAuthGuard)
  async linkedinAuth() {
    return;
  }

  @Get('linkedin/callback')
  @UseGuards(LinkedinAuthGuard)
  async linkedinCallback(@Request() req, @Res() res: Response, @Query('state') state?: string) {
    const result = await this.authService.socialLogin(req.user);
    return this.redirectWithToken(res, result.access_token, state);
  }

  @Get('microsoft')
  @UseGuards(MicrosoftAuthGuard)
  async microsoftAuth() {
    return;
  }

  @Get('microsoft/callback')
  @UseGuards(MicrosoftAuthGuard)
  async microsoftCallback(@Request() req, @Res() res: Response, @Query('state') state?: string) {
    const result = await this.authService.socialLogin(req.user);
    return this.redirectWithToken(res, result.access_token, state);
  }

  private redirectWithToken(res: Response, token: string, state?: string) {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const isLocalizedState =
      typeof state === 'string' && /^\/(en|fr|de|ar)(\/|$)/.test(state);
    const localePrefix = isLocalizedState ? state!.split('/')[1] : null;
    const redirectPath = localePrefix ? `/${localePrefix}/login` : '/login';
    const redirectUrl = new URL(redirectPath, frontendUrl);

    if (state && state.startsWith('/')) {
      redirectUrl.searchParams.set('next', state);
    }

    redirectUrl.searchParams.set('token', token);
    return res.redirect(redirectUrl.toString());
  }

  @Post('register')
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  async login(@Body() _body: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // Token-based auth, logout is handled on client by removing token
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async getMe(@Request() req) {
    return req.user;
  }

  @Post('forgot-password')
  @HttpCode(200)
  @Throttle({ default: { limit: 3, ttl: 60_000 } }) // 3 requests per minute
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    await this.authService.forgotPassword(body.email);
    // Always return same response to prevent email enumeration
    return { message: 'If an account exists for that email, a reset link has been sent.' };
  }

  @Post('reset-password')
  @HttpCode(200)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async resetPassword(@Body() body: ResetPasswordDto) {
    await this.authService.resetPassword(body.token, body.password);
    return { message: 'Password reset successfully. Please log in.' };
  }
}
