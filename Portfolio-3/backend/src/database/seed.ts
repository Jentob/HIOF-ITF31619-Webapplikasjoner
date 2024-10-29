import { ProjectSchemas } from "@/features/project/schema";
import { db, type DB } from "./db";
import {
    projects as projectTable,
    projectTags as projectTagsTable,
    projectToProjectTags as projectToProjectTagsTable,
    users as userTable,
} from "./schema";
import { UserSchemas } from "@/features/user/schema";
import { ProjectTagSchemas } from "@/features/project-tag/schema";

const users: (typeof userTable.$inferInsert)[] = UserSchemas.insert.array.parse(
    [
        {
            id: "5525434d-e2b7-4791-b125-f8d6bbc65b79",
            name: "Tobias",
            email: "tobiasje@hiof.no",
        },
    ]
);

const projects: (typeof projectTable.$inferInsert)[] =
    ProjectSchemas.insert.array.parse([
        {
            id: "71cbc2ac-f003-4422-88f6-90a9ed74b1a8",
            userId: "5525434d-e2b7-4791-b125-f8d6bbc65b79",
            title: "Personlig nettside",
            description: "Nettside for CVen min laget med Astro",
            url: "https://github.com/Jentob/jentob.github.io",
        },
        {
            id: "5d0ea3e1-f03c-42f1-8c21-b470da12849d",
            userId: "5525434d-e2b7-4791-b125-f8d6bbc65b79",
            title: "PHP-side",
            description: "Oblig i Datasikkerhet i utvikling og drift",
            url: "https://github.com/sanderbjo/Datasikkerhet-i-utvikling-og-drift",
        },
        {
            id: "6aabb392-e677-4d4d-9713-5cda9950e93e",
            userId: "5525434d-e2b7-4791-b125-f8d6bbc65b79",
            title: "Skoleoppgaver",
            description: "Oppgaver til emnet ITF31619 Webapplikasjoner",
            url: "https://github.com/Jentob/HIOF-ITF31619-Webapplikasjoner",
            public: false,
        },
    ]);

const projectTags: (typeof projectTagsTable.$inferInsert)[] =
    ProjectTagSchemas.insert.array.parse([
        {
            id: "d2338576-d095-4f89-9432-cf65554d8040",
            name: "Astro",
        },
        {
            id: "3d872975-f960-420c-8124-2367237590d1",
            name: "PHP",
        },
        {
            id: "62c6491c-d5ad-4a72-9d7f-fec4abead156",
            name: "Nettside",
        },
    ]);

const projectToProjectTags: (typeof projectToProjectTagsTable.$inferInsert)[] =
    [
        {
            projectId: "71cbc2ac-f003-4422-88f6-90a9ed74b1a8",
            tagId: "d2338576-d095-4f89-9432-cf65554d8040",
        },
        {
            projectId: "5d0ea3e1-f03c-42f1-8c21-b470da12849d",
            tagId: "3d872975-f960-420c-8124-2367237590d1",
        },
        {
            projectId: "71cbc2ac-f003-4422-88f6-90a9ed74b1a8",
            tagId: "62c6491c-d5ad-4a72-9d7f-fec4abead156",
        },
        {
            projectId: "5d0ea3e1-f03c-42f1-8c21-b470da12849d",
            tagId: "62c6491c-d5ad-4a72-9d7f-fec4abead156",
        },
        {
            projectId: "6aabb392-e677-4d4d-9713-5cda9950e93e",
            tagId: "62c6491c-d5ad-4a72-9d7f-fec4abead156",
        },
    ];

export const seedDatabase = (db: DB) => {
    db.insert(userTable).values(users).execute();

    db.insert(projectTable).values(projects).execute();

    db.insert(projectTagsTable).values(projectTags).execute();

    db.insert(projectToProjectTagsTable).values(projectToProjectTags).execute();
};

seedDatabase(db);
