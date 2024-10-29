import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export type ServerEnv = typeof env;

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        PORT: z.coerce.number().default(3001),
        DATABASE_PATH: z
            .union([z.string().endsWith(".sqlite"), z.literal(":memory:")])
            .default("./data/data.sqlite"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
    skipValidation: false,
});
