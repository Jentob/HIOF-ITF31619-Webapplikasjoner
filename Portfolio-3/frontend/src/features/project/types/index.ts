import { z } from "zod";
import {
    CreateProjectSchema,
    ProjectSchema,
    ProjectTagSchema,
} from "../schema";

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof CreateProjectSchema>;

export type ProjectTag = z.infer<typeof ProjectTagSchema>;
