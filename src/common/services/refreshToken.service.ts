import { Injectable } from "@nestjs/common";
import { RefreshToken } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class RefreshTokenService {
    constructor(private prisma: PrismaService) {}

    /*
     * Finds a refresh token by it's value.
     */
    async findToken(token: string): Promise<RefreshToken | null> {
        return this.prisma.refreshToken.findUnique({
            where: {
                token,
            },
        });
    }

    /*
     * Create a new refresh token.
     */
    async createRefreshToken(
        userId: number,
        userAgent: string,
        userHost: string,
        token: string,
    ): Promise<RefreshToken> {
        return this.prisma.refreshToken.create({
            data: {
                userId,
                userAgent,
                userHost,
                token,
            },
        });
    }

    /*
     * Revoke a refresh token by it's ID.
     */
    async revokeRefreshTokenByValue(value: string): Promise<RefreshToken> {
        return this.prisma.refreshToken.update({
            where: {
                token: value,
            },
            data: {
                deleted_at: new Date(),
            },
        });
    }

    /*
     * Delete all refresh tokens tied to a user ID.
     * @return the number of deleted tokens.
     */
    async deleteAllRefreshTokensByUserId(userId: number): Promise<number> {
        const res: any = await this.prisma.refreshToken.deleteMany({
            where: {
                userId,
            },
        });

        return res.count;
    }
}