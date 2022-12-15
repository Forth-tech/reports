import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { RefreshToken, User } from "@prisma/client";
import { Request } from "express";
import { FastifyRequest } from "fastify";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshTokenService } from "src/common/services/refreshToken.service";
import { UsersService } from "src/users/users.service";
import { jwtConstants } from "./constants";
import { RefreshTokenPayload } from "./dto/tokens.dto";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(
        private userSerivce: UsersService,
        private readonly refreshTokenService: RefreshTokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies?.Authentication;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            passReqToCallback: true,
        });
    }

    async validate(request: FastifyRequest, payload: RefreshTokenPayload): Promise<User> {
        const refreshTokenCookie: string = request.cookies?.refreshToken;

        const refreshToken: RefreshToken = await this.refreshTokenService.findToken(refreshTokenCookie);
        if (!refreshToken) {
            throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }

        if (refreshToken.deleted_at !== null) {
            throw new HttpException("Refresh token has been revoked", HttpStatus.UNAUTHORIZED);
        }

        return await this.userSerivce.findUserById(payload.user_id);
    }
}