import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const id = {
    id: text("id", { length: 36 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
};

export const timestamps = {
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => sql`(unixepoch())`)
        .$onUpdateFn(() => sql`(unixepoch())`),
};
