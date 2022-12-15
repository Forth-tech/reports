import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/common/services/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-access-token.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from 'src/common/services/refreshToken.service';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    RefreshTokenService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}