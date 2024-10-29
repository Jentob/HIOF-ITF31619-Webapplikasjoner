import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { env } from "@/lib/env";
import * as schema from "./schema";

const dbPath: string = env.DATABASE_PATH;

const sqlite = new Database(dbPath);

sqlite.exec("PRAGMA journal_mode = WAL;");

export const db = drizzle(sqlite, { schema: { ...schema } });

export type DB = typeof db;
