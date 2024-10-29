import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "./lib/env";
import { db, type DB } from "./database/db";
import { errorHandler, NotFoundError } from "./lib/error";
import createPC from "./features/project/controller";
import createPS from "./features/project/service";
import createPR from "./features/project/repository";
import createPTS from "./features/project-tag/service";
import createPTR from "./features/project-tag/repository";
import { getCookie } from "hono/cookie";

const port: number = env.PORT || 3001;

export type Variables = {
    userId: string;
    role: "admin" | "user";
};

export const makeApp = (db: DB) => {
    const app = new Hono<{ Variables: Variables }>();

    const projectController = createPC(
        createPS(createPR(db)),
        createPTS(createPTR(db))
    );

    app.use(cors());
    app.use(logger());

    // Simulerer auth mellomvare
    app.use(async (c, next) => {
        const role = getCookie(c, "role");
        if (role === "admin") {
            c.set("role", "admin");
        } else {
            c.set("role", "user");
        }
        c.set("userId", "5525434d-e2b7-4791-b125-f8d6bbc65b79");
        await next();
    });

    app.route("/v1/projects", projectController);

    app.notFound(() => {
        throw new NotFoundError();
    });

    app.onError(errorHandler);

    return app;
};

const app = makeApp(db);

export default {
    port,
    fetch: app.fetch,
};
