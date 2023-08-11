import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email'],
      sessionStorage: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, emails, photos, displayName } = profile;
    let user = await this.userService.findUserByGoogleId(id);

    if (!user) {
      await this.authService.register({
        email: emails[0].value,
        name: displayName,
        google_id: id,
        avatar: photos[0].value,
      });

      user = await this.userService.findUserByGoogleId(id);
    }

    done(null, { sub: user.id, email: user.email });
  }
}
