import { and, eq } from "drizzle-orm";
import { projects as projectsTable } from "@/database/schema";
import type { DB } from "@/database/db";
import type {
    InsertProject,
    InternalProject,
    SelectProject,
    UpdateProject,
} from "../types";
import type {
    GetByIdOptions,
    GetOptions,
    IProjectRepository,
} from "./interface";
import { dbMappers } from "../helpers";
import { NotFoundError, NotImplementedError } from "@/lib/error";

type SelectWithTags = SelectProject & { tags: { tagId: string }[] };

class ProjectRepository implements IProjectRepository {
    private readonly db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    get = async (options: GetOptions = {}) => {
        if (options.userId) throw new NotImplementedError();

        const projects: SelectWithTags[] = [];
        if (options.public) {
            projects.push(
                ...(await this.db.query.projects.findMany({
                    where: eq(projectsTable.public, true),
                    with: { tags: { columns: { tagId: true } } },
                }))
            );
        } else {
            projects.push(
                ...(await this.db.query.projects.findMany({
                    with: { tags: { columns: { tagId: true } } },
                }))
            );
        }

        return projects.map((project) =>
            dbMappers.selectWithTagsToInternal(project)
        );
    };

    getById = async (
        id: string,
        args: GetByIdOptions = {}
    ): Promise<InternalProject> => {
        let project: SelectWithTags | undefined;
        if (args.public) {
            project = await this.db.query.projects.findFirst({
                where: and(
                    eq(projectsTable.id, id),
                    eq(projectsTable.public, true)
                ),
                with: { tags: { columns: { tagId: true } } },
            });
        } else {
            project = await this.db.query.projects.findFirst({
                where: eq(projectsTable.id, id),
                with: { tags: { columns: { tagId: true } } },
            });
        }
        if (project === undefined) throw new NotFoundError();

        return dbMappers.selectWithTagsToInternal(project);
    };

    create = async (project: InsertProject): Promise<InternalProject> => {
        const data = await this.db
            .insert(projectsTable)
            .values(project)
            .returning();

        return dbMappers.selectToInternal(data[0]);
    };

    delete = async (id: string): Promise<string> => {
        const data = await this.db
            .delete(projectsTable)
            .where(eq(projectsTable.id, id))
            .returning({ id: projectsTable.id });
        if (data.length === 0) throw new NotFoundError();

        return data[0].id;
    };

    update = async (project: UpdateProject): Promise<InternalProject> => {
        const data = await this.db
            .update(projectsTable)
            .set(project)
            .where(eq(projectsTable.id, project.id))
            .returning();
        if (data.length === 0) throw new NotFoundError();

        return dbMappers.selectToInternal(data[0]);
    };
}

const createProjectRepository = (db: DB) => new ProjectRepository(db);

export default createProjectRepository;
