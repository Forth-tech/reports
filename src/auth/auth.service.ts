import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RefreshTokenService } from '../common/services/refreshToken.service';
import { UsersService } from '../users/users.service';
import { AccessTokenPayload, RefreshTokenPayload } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pwd: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && bcrypt.compare(pwd, user.hashedPassword)) {
      return user;
    }
    return null;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  async generateRefreshToken(
    user: User,
    userHost: string,
    userAgent: string,
  ): Promise<string> {
    const payload: RefreshTokenPayload = {
      user_id: user.id,
      user_email: user.email,
      user_name: user.name,
    };

    const refreshToken: RefreshToken =
      await this.refreshTokenService.createRefreshToken(
        user.id,
        userAgent,
        userHost,
        this.jwtService.sign(payload, { expiresIn: '1d' }),
      );

    return refreshToken.token;
  }
}
