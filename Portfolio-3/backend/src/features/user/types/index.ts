import type { z } from "zod";
import type { UserSchemas as s } from "../schema";

export type SelectUser = z.infer<typeof s.select.single>;

export type InternalUser = z.infer<typeof s.internal.single>;

export type PublicUser = z.infer<typeof s.public.single>;

export type InsertUser = z.infer<typeof s.insert.single>;

export type CreateUser = z.infer<typeof s.create.single>;