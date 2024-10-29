import type { InternalProject, PublicProject, SelectProject } from "../types";

export const dbMappers = {
    selectToInternal: (project: SelectProject): InternalProject => {
        return {
            id: project.id,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            title: project.title,
            description: project.description,
            url: project.url,
            public: project.public,
            tags: [],
            type: "project",
        };
    },
    selectWithTagsToInternal: (
        project: SelectProject & { tags: { tagId: string }[] }
    ): InternalProject => {
        return {
            id: project.id,
            userId: project.userId,
            createdAt: project.createdAt,
            updatedAt: project.updatedAt,
            title: project.title,
            description: project.description,
            url: project.url,
            public: project.public,
            tags: project.tags.map((tag) => {
                return tag.tagId;
            }),
            type: "project",
        };
    },
};

export const toPublic = {
    single: (project: InternalProject): PublicProject => {
        return {
            id: project.id,
            type: project.type,
            title: project.title,
            description: project.description,
            url: project.url,
            tags: project.tags,
        };
    },
    array: (projects: InternalProject[]): PublicProject[] => {
        return projects.map((p) => {
            return {
                id: p.id,
                type: p.type,
                title: p.title,
                description: p.description,
                url: p.url,
                tags: p.tags,
            };
        });
    },
};
