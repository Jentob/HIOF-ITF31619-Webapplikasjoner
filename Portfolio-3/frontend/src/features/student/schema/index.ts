import { z } from "zod";

export const SkillSchema = z.object({
    name: z.string(),
});

export const StudentSchema = z.object({
    name: z.string(),
    email: z.string(),
    about: z.string(),
    skills: z.array(SkillSchema),
});

export const StudentSchemaArray = z.array(StudentSchema);
