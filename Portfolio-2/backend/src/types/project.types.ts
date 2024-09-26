import { z } from "zod";
import { ProjectTagArraySchema } from "./project-tags.types";

export const ProjectSchema = z.object({
    id: z.string().uuid(),
    type: z.literal("project"),
    createdAt: z.number().int(), // Unix time
    updatedAt: z.number().int(), // Unix time

    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    tags: ProjectTagArraySchema,
});

export const CreateProjectSchema = ProjectSchema.pick({
    title: true,
    description: true,
    url: true,
    tags: true,
});

export const PublicProjectSchema = ProjectSchema.pick({
    id: true,
    type: true,

    title: true,
    description: true,
    url: true,
    tags: true,
});

export const ProjectArraySchema = z.array(ProjectSchema);

export const CreateProjectArraySchema = z.array(PublicProjectSchema);

export const PublicProjectArraySchema = z.array(PublicProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof CreateProjectSchema>;

export type PublicProject = z.infer<typeof PublicProjectSchema>;
