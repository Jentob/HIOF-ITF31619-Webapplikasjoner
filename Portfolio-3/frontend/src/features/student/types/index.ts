import { z } from "zod";
import { SkillSchema, StudentSchema } from "../schema";

export type Skill = z.infer<typeof SkillSchema>;

export type Student = z.infer<typeof StudentSchema>;
