import { test, describe, expect } from "bun:test";
import { ProjectSchemas as s } from "@/features/project/schema";
import createService from "@/features/project/service";
import type {
    InsertProject,
    InternalProject,
    PublicProject,
    UpdateProject,
} from "@/features/project/types";
import type {
    GetByIdOptions,
    GetOptions,
    IProjectRepository,
} from "@/features/project/repository/interface";

describe("Project Service Public Filter", () => {
    const mockProjects: InternalProject[] = s.internal.array.parse([
        {
            id: "70aef45e-32c3-4548-a717-31972ae6b47b",
            userId: "01916182-7575-446e-b41e-c6d822500d86",
            public: true,
            type: "project",
            title: "Project 1",
            description: "Description 1",
            url: "http://google.com",
            tags: ["f273acf2-0225-4b05-a231-4f4fcc814dc2"],
            createdAt: new Date("2024-10-16T20:40:03.205Z"),
            updatedAt: new Date("2024-10-16T20:40:03.205Z"),
        },
        {
            id: "fa238c6b-2966-4724-ba40-c269f50765d6",
            userId: "01916182-7575-446e-b41e-c6d822500d86",
            public: true,
            type: "project",
            title: "Project 2",
            description: "Description 2",
            url: "http://youtube.com",
            tags: ["442d3b4d-1503-4f68-9d6e-3955130a7a7e"],
            createdAt: new Date("2024-10-16T20:40:03.205Z"),
            updatedAt: new Date("2024-10-16T20:40:03.205Z"),
        },
    ]);

    const mockPublicProjects: PublicProject[] =
        s.public.array.parse(mockProjects);

    const mockRepository: IProjectRepository = {
        get: async (args?: GetOptions): Promise<InternalProject[]> => {
            return mockProjects;
        },

        getById: async (
            id: string,
            args?: GetByIdOptions
        ): Promise<InternalProject> => {
            const project = mockProjects.find((project) => project.id === id);
            if (!project) {
                throw new Error("Project not found");
            }
            return project;
        },

        create: async (project: InsertProject): Promise<InternalProject> => {
            throw new Error("Not implemented");
        },

        delete: async (id: string): Promise<string> => {
            throw new Error("Not implemented");
        },

        update: async (project: UpdateProject): Promise<InternalProject> => {
            throw new Error("Not implemented");
        },
    };

    const ps = createService(mockRepository);

    test("getAllProjects should return a list of type PublicProject", async () => {
        const projects = await ps.getAllProjects("admin");

        expect(projects).toEqual(mockPublicProjects);
    });
    test("getProjectById should return a single PublicProject", async () => {
        const project = await ps.getProjectById(
            "70aef45e-32c3-4548-a717-31972ae6b47b"
        );
        const project2 = await ps.getProjectById(
            "fa238c6b-2966-4724-ba40-c269f50765d6"
        );

        expect(project).toEqual(mockPublicProjects[0]);
        expect(project2).toEqual(mockPublicProjects[1]);
    });
});
