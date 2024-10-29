import type { DB } from "@/database/db";
import type { IProjectTagRepository } from "./interface";
import type { SelectProjectTag } from "../types";
import { dbMappers } from "../helpers";

class ProjectTagRepository implements IProjectTagRepository {
    private readonly db: DB;

    constructor(db: DB) {
        this.db = db;
    }

    getMultipleById = async (...ids: string[]) => {
        const tags: SelectProjectTag[] = [];
        tags.push(
            ...(await this.db.query.projectTags.findMany({
                where: (projectTags, { inArray }) =>
                    inArray(projectTags.id, ids),
            }))
        );
        return tags.map((tag) => dbMappers.selectToInternal(tag));
    };
}

const createProjectTagRepository = (db: DB) => new ProjectTagRepository(db);

export default createProjectTagRepository;
