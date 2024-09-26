import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectsRouter } from "./routes";

declare module "bun" {
    interface Env {
        PORT: number;
    }
}

const port: number = process.env.PORT || 3001;

const app = new Hono();

app.use(cors());

app.route("/projects", projectsRouter);

export default {
    port,
    fetch: app.fetch,
};
