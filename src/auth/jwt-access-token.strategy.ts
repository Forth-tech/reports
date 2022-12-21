import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';
import { AccessTokenPayload } from './dto/tokens.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /*
   * This method is called when a user is trying to access a protected route.
   * It is called after the JWT strategy has verified the token.
   * It injects a user object into the request object.
   */
  async validate(payload: AccessTokenPayload): Promise<User> {
    return await this.userService.findUserById(payload.id);
  }
}
