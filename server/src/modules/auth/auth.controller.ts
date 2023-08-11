import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { UserRegisterDto } from './dto/user-register.dto';
import { GoogleGuard } from './guards/google.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    return await this.authService.register(user);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.user.sub as number);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return await this.authService.refreshTokens(
      req.user.email,
      req.user.refresh_token,
    );
  }
}
