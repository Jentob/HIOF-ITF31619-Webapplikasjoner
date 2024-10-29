import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { projectTags } from "@/database/schema";

const SelectProjectTagSchema = createSelectSchema(projectTags, {
    id: z.string().uuid(),
});

const InternalProjectTagSchema = SelectProjectTagSchema.extend({
    type: z.literal("project-tag"),
});

const PublicProjectTagSchema = InternalProjectTagSchema;

const InsertProjectTagSchema = createInsertSchema(projectTags, {
    id: SelectProjectTagSchema.shape.id,
});

const CreateProjectTagSchema = InsertProjectTagSchema.pick({
    name: true,
});

const SelectProjectTagArraySchema = z.array(SelectProjectTagSchema);

const InternalProjectTagArraySchema = z.array(InternalProjectTagSchema);

const PublicProjectTagArraySchema = z.array(PublicProjectTagSchema);

const InsertProjectTagArraySchema = z.array(InsertProjectTagSchema);

const CreateProjectTagArraySchema = z.array(CreateProjectTagSchema);

const ProjectTagSchemas = {
    select: {
        single: SelectProjectTagSchema,
        array: SelectProjectTagArraySchema,
    },
    internal: {
        single: InternalProjectTagSchema,
        array: InternalProjectTagArraySchema,
    },
    public: {
        single: PublicProjectTagSchema,
        array: PublicProjectTagArraySchema,
    },
    insert: {
        single: InsertProjectTagSchema,
        array: InsertProjectTagArraySchema,
    },
    create: {
        single: CreateProjectTagSchema,
        array: CreateProjectTagArraySchema,
    },
};

export { ProjectTagSchemas };
