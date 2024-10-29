import type { InternalProjectTag } from "../types";

interface IProjectTagRepository {
    getMultipleById(...ids: string[]): Promise<InternalProjectTag[]>;
}

export type { IProjectTagRepository };
