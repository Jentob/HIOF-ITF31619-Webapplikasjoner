import { Hono } from "hono";
import { makeResponse } from "@/lib/response";
import type { IProjectService } from "../service/interface";
import { ProjectSchemas } from "../schema";
import { BadRequestError } from "@/lib/error";
import type { Variables } from "@/server";
import type { IProjectTagService } from "@/features/project-tag/service/interface";

const createProjectController = (
    projectService: IProjectService,
    projectTagService: IProjectTagService
) => {
    const ps: IProjectService = projectService;
    const pts: IProjectTagService = projectTagService;
    const controller = new Hono<{ Variables: Variables }>();

    controller.get("/", async (c) => {
        const projects = await ps.getAllProjects(c.get("role"));
        const tagIds = [...new Set(projects.flatMap((item) => item.tags))];
        const projectTags = await pts.getMultipleProjectTagsById(...tagIds);
        return makeResponse(c, { projects: projects, tags: projectTags }, 200);
    });

    controller.get("/:id", async (c) => {
        const projectId: string = c.req.param("id");
        try {
            ProjectSchemas.public.single.shape.id.parse(projectId);
        } catch (error) {
            throw new BadRequestError(error);
        }

        const data = await ps.getProjectById(projectId);
        const tagIds = data.tags;
        const projectTags = await pts.getMultipleProjectTagsById(...tagIds);

        return makeResponse(c, { project: data, tags: projectTags }, 200);
    });

    controller.post("/", async (c) => {
        const project = await c.req.json();
        try {
            ProjectSchemas.create.single.parse(project);
        } catch (error) {
            throw new BadRequestError(error);
        }

        const data = await ps.createProject({
            ...project,
            userId: c.get("userId"),
        });

        return makeResponse(c, { project: data }, 201);
    });

    controller.delete("/:id", async (c) => {
        const projectId: string = c.req.param("id");

        try {
            ProjectSchemas.public.single.shape.id.parse(projectId);
        } catch (error) {
            throw new BadRequestError(error);
        }

        await ps.deleteProject(projectId);

        return c.json(null, 204);
    });

    controller.patch("/:id", async (c) => {
        //TODO: Abstrakter validering til middleware
        const projectId: string = c.req.param("id");
        const project = await c.req.json();
        try {
            ProjectSchemas.public.single.shape.id.parse(projectId);
            ProjectSchemas.update.single.parse(project);
            if (project.id !== projectId) {
                throw new BadRequestError("Path id and body id must match");
            }
        } catch (error) {
            throw new BadRequestError(error);
        }

        const data = await ps.updateProject(project);

        return makeResponse(c, { project: data }, 200);
    });

    return controller;
};

export default createProjectController;
