import { type Context } from "hono";
import { ZodError } from "zod";
import {
    type CreateProject,
    type ErrorResponse,
    type PublicProject,
    CreateProjectSchema,
    ProjectSchema,
} from "../types";
import { projectService as ps } from "../services";
import { errorUtility as eu } from "../util";

export const getAllProjects = async (c: Context) => {
    try {
        const projects: PublicProject[] = [];
        projects.push(...(await ps.getAllProjects()));
        return c.json({ data: projects }, 200);
    } catch (error) {
        console.error("Error retrieving all project data:", error);
        return c.json([eu.createInternalServerErrorObject()], 500);
    }
};

export const getProjectById = async (c: Context) => {
    try {
        const projectId: string = c.req.param("id");

        ProjectSchema.shape.id.parse(projectId);

        const project: PublicProject | null =
            await ps.getProjectById(projectId);

        if (project) {
            return c.json({ data: project }, 200);
        } else {
            return c.json([eu.createNotFoundErrorObject("project")], 404);
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const e: ErrorResponse = {
                status: "400",
                code: "ZOD_ERROR",
                title: "Zod parsing error",
                detail: error.message
            };
            return c.json([e], 400);
        }
        console.error("Error retrieving single project data:", error);
        return c.json([eu.createInternalServerErrorObject()], 500);
    }
};

export const createProject = async (c: Context) => {
    try {
        const newCreateProject: CreateProject = CreateProjectSchema.parse(
            await c.req.json()
        );

        const newProject: PublicProject =
            await ps.createProject(newCreateProject);

        return c.json(
            { data: newProject },
            {
                status: 201,
                headers: {
                    Location: "/" + newProject.id,
                },
            }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            const e: ErrorResponse = {
                status: "400",
                code: "ZOD_ERROR",
                title: "Zod parsing error",
                detail: error.message
            };
            return c.json([e], 400);
        }
        console.error("Error creating project:", error);
        return c.json([eu.createInternalServerErrorObject()], 500);
    }
};

export const deleteProject = async (c: Context) => {
    try {
        const projectId: string = c.req.param("id");
        ProjectSchema.shape.id.parse(projectId);

        if (await ps.deleteProject(projectId)) {
            return c.status(204);
        } else {
            return c.json([eu.createNotFoundErrorObject("project")], 404);
        }
    } catch (error) {
        if (error instanceof ZodError) {
            const e: ErrorResponse = {
                status: "400",
                code: "ZOD_ERROR",
                title: "Zod parsing feil",
                detail: error.message
            };
            return c.json([e], 400);
        }
        console.error("Error deleting project:", error);
        return c.json([eu.createInternalServerErrorObject()], 500);
    }
};

export const updateProject = async (c: Context) => {
    // TODO
    return c.status(501);
};
