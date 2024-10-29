import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projects } from "@/database/schema";
import { ProjectTagSchemas } from "@/features/project-tag/schema";

const SelectProjectSchema = createSelectSchema(projects, {
    id: z.string().uuid(),
    userId: z.string().uuid(),
    url: z.string().url(),
});

const InternalProjectSchema = SelectProjectSchema.extend({
    type: z.literal("project"),
    tags: z.array(ProjectTagSchemas.internal.single.shape.id),
});

const PublicProjectSchema = InternalProjectSchema.pick({
    id: true,
    type: true,

    title: true,
    description: true,
    url: true,
    tags: true,
});

const InsertProjectSchema = createInsertSchema(projects, {
    id: SelectProjectSchema.shape.id,
    url: SelectProjectSchema.shape.url,
});

const CreateProjectSchema = InsertProjectSchema.pick({
    title: true,
    description: true,
    url: true,
});

// TODO: Fix this schema
const UpdateProjectSchema = z.object({
    id: SelectProjectSchema.shape.id,
    title: z.optional(SelectProjectSchema.shape.title),
    description: z.optional(SelectProjectSchema.shape.description),
    url: z.optional(SelectProjectSchema.shape.url),
});

const SelectProjectArraySchema = z.array(SelectProjectSchema);

const InternalProjectArraySchema = z.array(InternalProjectSchema);

const ProjectArraySchema = z.array(PublicProjectSchema);

const InsertProjectArraySchema = z.array(InsertProjectSchema);

const CreateProjectArraySchema = z.array(CreateProjectSchema);

const UpdateProjectArraySchema = z.array(UpdateProjectSchema);

const ProjectSchemas = {
    select: { single: SelectProjectSchema, array: SelectProjectArraySchema },
    internal: {
        single: InternalProjectSchema,
        array: InternalProjectArraySchema,
    },
    public: { single: PublicProjectSchema, array: ProjectArraySchema },
    insert: { single: InsertProjectSchema, array: InsertProjectArraySchema },
    create: { single: CreateProjectSchema, array: CreateProjectArraySchema },
    update: { single: UpdateProjectSchema, array: UpdateProjectArraySchema },
};

export { ProjectSchemas };
