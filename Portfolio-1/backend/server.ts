import { Hono } from "hono";
import { cors } from "hono/cors";
import { ZodError } from "zod";
import {
    ProjectCreateSchema,
    type CreateProject,
    type Project,
} from "../types";

const port = 3001;

const dataPath: string = import.meta.dir + "/data.json";
const dataFile = Bun.file(dataPath, { type: "application/json" });

const app = new Hono();

app.use(cors());

app.get("/projects", async (c) => {
    try {
        const data: Project[] = await dataFile.json();
        return c.json(data);
    } catch (error) {
        console.error("Error retrieving all project data:", error);
        return c.status(500);
    }
});

app.get("/projects/:id", async (c) => {
    try {
        const projectId = c.req.param("id");

        const data: Project[] = await dataFile.json();
        const project: Project | undefined = data.find(
            (project) => project.id === projectId
        );

        if (project) {
            return c.json(project);
        } else {
            return c.status(404);
        }
    } catch (error) {
        console.error("Error retrieving single project data:", error);
        return c.status(500);
    }
});

app.post("/projects", async (c) => {
    try {
        const newCreateProject: CreateProject = ProjectCreateSchema.parse(
            await c.req.json()
        );

        const data: Project[] = await dataFile.json();

        const newProject: Project = {
            ...newCreateProject,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };
        data.push(newProject);

        const dataString: string = JSON.stringify(data);
        Bun.write(dataPath, dataString);

        return c.json(newProject, {
            status: 201,
            headers: {
                Location: "/projects/" + newProject.id,
            },
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return c.status(400);
        }

        console.error("Error creating project:", error);
        return c.status(500);
    }
});

app.delete("/projects/:id", async (c) => {
    try {
        const data: Project[] = await dataFile.json();
        const projectId: string = c.req.param("id");

        const projectIndex: number = data.findIndex(
            (project) => project.id === projectId
        );

        if (projectIndex !== -1) {
            data.splice(projectIndex, 1);

            Bun.write(dataPath, JSON.stringify(data));

            return c.status(204);
        } else {
            return c.status(404);
        }
    } catch (error) {
        console.error("Error deleting project:", error);
        return c.status(500);
    }
});

console.log(`Server is running on port ${port}`);

export default {
    port,
    fetch: app.fetch,
};
