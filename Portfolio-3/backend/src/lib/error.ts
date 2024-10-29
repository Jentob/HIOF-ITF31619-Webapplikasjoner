import { HTTPException } from "hono/http-exception";
import { z, ZodError } from "zod";
import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

const ErrorCodeSchema = z.enum([
    "BAD_REQUEST",
    "FORBIDDEN",
    "INTERNAL_SERVER_ERROR",
    "NOT_FOUND",
    "NOT_UNIQUE",
    "RATE_LIMITED",
    "UNAUTHORIZED",
    "METHOD_NOT_ALLOWED",
]);

// eslint-disable-next-line
const ErrorResponseSchema = z.object({
    status: z.coerce.string().regex(/^[1-5][0-9][0-9]$/),
    code: ErrorCodeSchema,
    title: z.string(),
    detail: z.unknown(),
});

type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

const createErrorResponse = (e: ErrorResponse): Response => {
    const error: ErrorResponse = {
        status: e.status,
        code: e.code,
        title: e.title,
        detail: e.detail,
    };
    return new Response(JSON.stringify({ error: error }), {
        status: parseInt(e.status),
        headers: { "Content-Type": "application/json" },
    });
};

export class NotImplementedError extends HTTPException {
    constructor(detail: string = "This feature is not implemented") {
        const status: StatusCode = 500;
        super(status, {
            res: createErrorResponse({
                status: status.toString(),
                code: "INTERNAL_SERVER_ERROR",
                title: "Not Implemented",
                detail: detail,
            }),
        });
    }
}

export class NotFoundError extends HTTPException {
    constructor() {
        const status: StatusCode = 404;
        super(status, {
            res: createErrorResponse({
                status: status.toString(),
                code: "NOT_FOUND",
                title: "Resource not found",
                detail: "The requested resource was not found",
            }),
        });
    }
}

export class BadRequestError extends HTTPException {
    constructor(error: unknown) {
        const status: StatusCode = 400;
        let detail: unknown = "The request is malformed";
        if (error instanceof ZodError) {
            detail = error.errors;
        }
        super(status, {
            res: createErrorResponse({
                status: status.toString(),
                code: "BAD_REQUEST",
                title: "Bad request",
                detail: detail,
            }),
            cause: error,
        });
    }
}

export const errorHandler: ErrorHandler = (e, c) => {
    console.error(e);
    if (e instanceof HTTPException) {
        return e.getResponse();
    }
    return c.json({ error: "What the sigma" }, 500);
};
