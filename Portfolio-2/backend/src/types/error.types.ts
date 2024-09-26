import { z } from "zod";

export const errorResponseSchema = z.object({
    status: z.string().regex(/^[1-5][0-9][0-9]$/),
    code: z.string().toUpperCase().trim(),
    title: z.string().trim(),
    detail: z.string().trim(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;


