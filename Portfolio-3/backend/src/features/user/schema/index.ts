import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/database/schema";

const SelectUserSchema = createSelectSchema(users, {
    id: z.string().uuid(),
    email: z.string().email(),
});

const InternalUserSchema = SelectUserSchema.extend({
    type: z.literal("user"),
});

const PublicUserSchema = SelectUserSchema.pick({
    id: true,
    name: true,
    email: true,
});

const InsertUserSchema = createInsertSchema(users, {
    id: SelectUserSchema.shape.id,
    email: SelectUserSchema.shape.email,
});

const CreateUserSchema = InsertUserSchema.pick({
    name: true,
    email: true,
});

const SelectUserArraySchema = z.array(SelectUserSchema);

const InternalUserArraySchema = z.array(InternalUserSchema);

const PublicUserArraySchema = z.array(PublicUserSchema);

const InsertUserArraySchema = z.array(InsertUserSchema);

const CreateUserArraySchema = z.array(CreateUserSchema);

const UserSchemas = {
    select: {
        single: SelectUserSchema,
        array: SelectUserArraySchema,
    },
    internal: {
        single: InternalUserSchema,
        array: InternalUserArraySchema,
    },
    public: {
        single: PublicUserSchema,
        array: PublicUserArraySchema,
    },
    insert: {
        single: InsertUserSchema,
        array: InsertUserArraySchema,
    },
    create: {
        single: CreateUserSchema,
        array: CreateUserArraySchema,
    },
};

export { UserSchemas };
