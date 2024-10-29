import type { z } from "zod";
import type { ProjectTagSchemas as s } from "../schema";

export type SelectProjectTag = z.infer<typeof s.select.single>;

export type InternalProjectTag = z.infer<typeof s.internal.single>;

export type PublicProjectTag = z.infer<typeof s.public.single>;

export type InsertProjectTag = z.infer<typeof s.insert.single>;

export type CreateProjectTag = z.infer<typeof s.create.single>;
