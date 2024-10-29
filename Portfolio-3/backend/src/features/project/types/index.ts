import type { z } from "zod";
import type { ProjectSchemas as s } from "../schema";

export type SelectProject = z.infer<typeof s.select.single>;

export type InternalProject = z.infer<typeof s.internal.single>;

export type PublicProject = z.infer<typeof s.public.single>;

export type InsertProject = z.infer<typeof s.insert.single>;

export type CreateProject = z.infer<typeof s.create.single>;

export type UpdateProject = z.infer<typeof s.update.single>;
