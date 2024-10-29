import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export const makeResponse = <T>(
    c: Context,
    data: T,
    code: StatusCode = 200
) => {
    const response: { data: T } = { data: data };
    return c.json(response, code);
};
