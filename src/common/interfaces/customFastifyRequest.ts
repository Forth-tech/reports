import { FastifyRequest } from "fastify";
import { User } from ".prisma/client";

export interface FastifyRequestWithUser extends FastifyRequest {
    user: User;
}