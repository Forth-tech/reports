import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { FastifyReply, FastifyRequest } from "fastify";
import { DefaultResponseDto } from "../common/dto/defaultResponse.dto";

/*
 * Override the default http exception filter to add a custom response.
 * The response now matches the DefaultReponseDto class.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: FastifyReply = ctx.getResponse<FastifyReply>();
        const request: FastifyRequest = ctx.getRequest<FastifyRequest>();
        const status: number = exception.getStatus();
        const originalResponseBody: any = exception.getResponse();

        let message: string = "Unknown error.";
        if (typeof originalResponseBody === "string") {
            message = originalResponseBody;
        } else {
            // Check if original response body contains the message property.
            if (originalResponseBody.message) {
                // If the response body is an array, we need to join it into a single string.
                if (Array.isArray(originalResponseBody.message)) {
                    message = originalResponseBody.message.join("; ");
                } else {
                    if (originalResponseBody.message.includes("Unauthorized")) {
                        message = "Missing, invalid or expired access/refresh token.";
                    } else {
                        message = originalResponseBody.message;
                    }
                }
            }
        }

        // Extract the request's body.
        const requestBody: string = JSON.stringify(request.body);

        const responseBody: DefaultResponseDto = {
            success: false,
            message,
            data: {},
        };

        this.logger.error(
            `${request.method} ${request.url} ` +
                `${status} ${requestBody} ` +
                `${JSON.stringify(responseBody)}`,
        );
        response.status(status).send(responseBody);
    }
}