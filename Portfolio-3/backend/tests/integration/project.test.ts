// Denne testen funker ikke
import { makeApp, type Variables } from "@/server";
import {
    test,
    describe,
    expect,
    afterEach,
    beforeAll,
} from "bun:test";
import { db } from "@/database/db";
import type { Hono } from "hono";
import { sql } from "drizzle-orm";
import { seedDatabase } from "@/database/seed";

const resetDb = () => {
    db.run(sql`DELETE FROM users`);
    db.run(sql`DELETE FROM projects`);
    db.run(sql`DELETE FROM project_tags`);
    db.run(sql`DELETE FROM project_to_project_tags`);
    seedDatabase(db);
};

let app: Hono<{ Variables: Variables }>;

beforeAll(() => {
    app = makeApp(db);
    seedDatabase(db)
})

afterEach(() => {
    resetDb();
});

describe("Project Integration", () => {
    test("Get all projects", async () => {
        const res = await app.request("/v1/projects");
        expect(res.status).toBe(200);

        const body = await res.json();
        expect(body.data.projects.length).toBe(2);
    });
});
