import { z } from "zod";

// Definerer et Zod-skjema for Project
export const ProjectSchema = z.object({
    id: z.string(),
    // Unix time
    createdAt: z.number(),
    title: z.string(),
    body: z.string(),
    url: z.string().url(),
});

export const ProjectCreateSchema = ProjectSchema.pick({
    title: true,
    body: true,
    url: true,
});

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;
