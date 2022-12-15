import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger = new Logger(LoggingInterceptor.name);

    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        // Extract information from the context.
        const httpCtx: HttpArgumentsHost = ctx.switchToHttp();
        const request: FastifyRequest = httpCtx.getRequest<FastifyRequest>();
        const response: FastifyReply = httpCtx.getResponse<FastifyReply>();

        // Extract the request's body.
        const requestBody: string = JSON.stringify(request.body);

        // Store the current timestamp.
        const now = Date.now();

        // Create basic logging information.
        let logStr: string = `${request.method} ${request.url} `;
        return next.handle().pipe(
            tap((data) => {
                // Calculate the response time.
                const timeTaken = Date.now() - now;

                // Extract the request's body.
                const responseBody: string = JSON.stringify(data);

                logStr += `${response.statusCode} ${timeTaken}ms ${requestBody} `;
                logStr += `${responseBody}`;
                this.logger.log(logStr);
            }),
        );
    }
}