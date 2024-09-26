import { z } from "zod";

export const ProjectTagSchema = z.object({
    name: z.string(),
});

export const ProjectTagArraySchema = z.array(ProjectTagSchema);