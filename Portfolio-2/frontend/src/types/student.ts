import { z } from "zod";

export const SkillSchema = z.object({
    name: z.string(),
});

export type Skill = z.infer<typeof SkillSchema>;

export const StudentSchema = z.object({
    name: z.string(),
    email: z.string(),
    about: z.string(),
    skills: z.array(SkillSchema),
});

export const StudentSchemaArray = z.array(StudentSchema);

export type Student = z.infer<typeof StudentSchema>;
