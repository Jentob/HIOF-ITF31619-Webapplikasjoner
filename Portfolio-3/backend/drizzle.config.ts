import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "sqlite",
    schema: "./src/database/schema.ts",
    out: "./data/drizzle",
    dbCredentials: {
        url: env.DATABASE_PATH,
    },
    verbose: true,
    strict: true,
});
