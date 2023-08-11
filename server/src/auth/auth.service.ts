import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from './dto/user-register.dto';
import * as argon from 'argon2';
import { Prisma, User } from '@prisma/client';
import { JwtTokensDto } from './dto/jwt-tokens.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(userDto: UserRegisterDto): Promise<JwtTokensDto> {
    this.logger.log('Registering new user');

    let hasedPassword;

    if (userDto.password) {
      hasedPassword = await argon.hash(userDto.password);
    }

    const user: Prisma.UserCreateInput = {
      email: userDto.email,
      password: hasedPassword,
      name: userDto.name ? userDto.name : 'Pomofocus user',
      avatar: userDto.avatar,
      google_id: userDto.google_id,
    };

    const createdUser = await this.usersService.registerUser(user);

    const tokens = await this.createTokens({
      email: createdUser.email,
      sub: createdUser.id,
    });
    await this.updateRefreshToken(createdUser.id, tokens.refresh_token);

    return tokens;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log('validating user');

    const user = await this.usersService.findUserByEmail(email);

    if (user && (await argon.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: JwtPayload): Promise<JwtTokensDto> {
    this.logger.log('Performing login');

    const payload = { email: user.email, sub: user.sub };
    const tokens = await this.createTokens(payload);

    await this.updateRefreshToken(user.sub, tokens.refresh_token);

    return tokens;
  }

  async logout(userid: number): Promise<boolean> {
    await this.usersService.updateUser(userid, { hashedRt: null });

    return true;
  }

  async refreshTokens(
    email: string,
    refreshToken: string,
  ): Promise<JwtTokensDto> {
    this.logger.log('Refreshing tokens');

    const user = await this.usersService.findUserByEmail(email);

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const refreshTokenMatch = await argon.verify(user.hashedRt, refreshToken);

    if (!refreshTokenMatch) throw new ForbiddenException('Access denied');

    const tokens = await this.createTokens({ email: user.email, sub: user.id });
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  private async createTokens(payload: JwtPayload): Promise<JwtTokensDto> {
    this.logger.log('Creating new pair of tokens');

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  private async updateRefreshToken(userId: number, rt: string) {
    const hash = await argon.hash(rt);

    await this.usersService.updateUser(userId, { hashedRt: hash });
  }
}
