import { string, z } from "zod";

export const ProjectSchema = z.object({
    id: z.string().uuid(),
    type: z.literal("project"),

    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    tags: z.array(z.string().uuid()),
});

export const CreateProjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
});

export const ProjectArraySchema = z.array(ProjectSchema);

export const CreateProjectArraySchema = z.array(CreateProjectSchema);

export const ProjectTagSchema = z.object({
    id: z.string().uuid(),
    name: string(),
    type: z.literal("project-tag"),
});

export const ProjectTagArraySchema = z.array(ProjectTagSchema);
