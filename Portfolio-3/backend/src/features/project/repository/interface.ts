import type { InsertProject, InternalProject, UpdateProject } from "../types";

type GetOptions = {
    public?: boolean;
    userId?: string;
};

type GetByIdOptions = {
    public?: boolean;
};

interface IProjectRepository {
    get(args?: GetOptions): Promise<InternalProject[]>;

    getById(id: string, args?: GetByIdOptions): Promise<InternalProject>;

    create(project: InsertProject): Promise<InternalProject>;

    delete(id: string): Promise<string>;

    update(project: UpdateProject): Promise<InternalProject>;
}

export type { IProjectRepository, GetOptions, GetByIdOptions };
