import {
    text,
    integer,
    sqliteTable,
    primaryKey,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { id, timestamps } from "./schema-components";

export const users = sqliteTable("user", {
    ...id,
    ...timestamps,
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
});

export const projects = sqliteTable("project", {
    ...id,
    ...timestamps,
    userId: text("user_id", { length: 36 })
        .notNull()
        .references(() => users.id),
    public: integer("public", { mode: "boolean" }).notNull().default(true),
    title: text("title").notNull(),
    description: text("description").notNull(),
    url: text("url").notNull(),
});

export const projectTags = sqliteTable("project_tag", {
    ...id,
    name: text("name").notNull().unique(),
});

export const projectToProjectTags = sqliteTable(
    "project_to_project_tag",
    {
        projectId: text("project_id", { length: 36 })
            .notNull()
            .references(() => projects.id),
        tagId: text("tag_id", { length: 36 })
            .notNull()
            .references(() => projectTags.id),
    },
    (t) => ({ pk: primaryKey({ columns: [t.projectId, t.tagId] }) })
);

export const usersRelations = relations(users, ({ many }) => ({
    posts: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    tags: many(projectToProjectTags),
}));

export const projectsTagsRelations = relations(projectTags, ({ many }) => ({
    projects: many(projectToProjectTags),
}));

export const projectToProjectTagRelations = relations(
    projectToProjectTags,
    ({ one }) => ({
        project: one(projects, {
            fields: [projectToProjectTags.projectId],
            references: [projects.id],
        }),
        tag: one(projectTags, {
            fields: [projectToProjectTags.tagId],
            references: [projectTags.id],
        }),
    })
);
