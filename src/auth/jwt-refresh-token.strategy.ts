import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { RefreshToken, User } from '@prisma/client';
import { Request } from 'express';
import { FastifyRequest } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenService } from 'src/common/services/refreshToken.service';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { RefreshTokenPayload } from './dto/tokens.dto';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

  constructor(
    private userService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      // Allow access the cookies in our  validate method.
      passReqToCallback: true,
    });
  }

  /*
   * This method is called when a user is trying to access a protected route.
   * It is called after the JWT strategy has verified the token.
   * It injects a user object into the request object.
   */
  async validate(
    request: FastifyRequest,
    payload: RefreshTokenPayload,
  ): Promise<User> {
    // Look for the refresh token cookie.
    const refreshTokenCookie: string = request.cookies?.refreshToken;

    // Look for the refresh token in the database.
    const refreshToken: RefreshToken = await this.refreshTokenService.findToken(
      refreshTokenCookie,
    );

    // If the refresh token is not found, return null.
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token not tied to any user.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Check if the refresh token is still valid.
    if (refreshToken.deleted_at !== null) {
      throw new HttpException(
        'Refresh token has already been revoked.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.userService.findUserById(payload.user_id);
  }
}
