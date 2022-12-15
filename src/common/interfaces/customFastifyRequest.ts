import { User } from '.prisma/client';
import { FastifyRequest } from 'fastify';

export interface FastifyRequestWithUser extends FastifyRequest {
    user: User;
}