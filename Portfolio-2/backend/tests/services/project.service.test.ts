import { test, expect, describe, mock } from "bun:test";
import {
    ProjectArraySchema,
    PublicProjectArraySchema,
    PublicProjectSchema,
    type Project,
} from "../../src/types";
import { projectService as ps } from "../../src/services";

describe("Project Service", () => {
    const mockProjects: Project[] = ProjectArraySchema.parse([
        {
            id: "70aef45e-32c3-4548-a717-31972ae6b47b",
            type: "project",
            title: "Project 1",
            description: "Description 1",
            url: "http://google.com",
            tags: ["tag1"],
            createdAt: 0,
            updatedAt: 1,
        },
        {
            id: "fa238c6b-2966-4724-ba40-c269f50765d6",
            type: "project",
            title: "Project 2",
            description: "Description 2",
            url: "http://youtube.com",
            tags: ["tag2"],
            createdAt: 3,
            updatedAt: 4,
        },
    ]);
    const mockGetAllProjects = (): Project[] => {
        return mockProjects;
    };
    const mockGetProjectById = (id: string): Project | null => {
        return mockProjects.find((project) => project.id === id) || null;
    };

    mock.module("../../src/models", () => {
        return {
            jsonProjectModel: {
                getAllProjects: mockGetAllProjects,
                getProjectById: mockGetProjectById,
            },
        };
    });

    test("getAllProjects should return a list of type PublicProject", async () => {
        const result = await ps.getAllProjects();

        const parsedResult = PublicProjectArraySchema.safeParse(result);
        expect(parsedResult.success).toBeTrue();

        expect(parsedResult.data).toEqual(
            PublicProjectArraySchema.parse(mockProjects)
        );
    });

    test("getProjectById should return a single PublicProject", async () => {
        const project1 = mockProjects[0];
        const result1 = await ps.getProjectById(project1.id);
        const parsedResult1 = PublicProjectSchema.safeParse(result1);

        expect(parsedResult1.success).toBeTrue();
        expect(parsedResult1.data).toEqual({
            id: project1.id,
            type: project1.type,
            title: project1.title,
            description: project1.description,
            url: project1.url,
            tags: project1.tags,
        });

        const project2 = mockProjects[1];
        const result2 = await ps.getProjectById(project2.id);
        const parsedResult2 = PublicProjectSchema.safeParse(result2);

        expect(parsedResult2.success).toBeTrue();
        expect(parsedResult2.data).toEqual({
            id: project2.id,
            type: project2.type,
            title: project2.title,
            description: project2.description,
            url: project2.url,
            tags: project2.tags,
        });
    });
});
