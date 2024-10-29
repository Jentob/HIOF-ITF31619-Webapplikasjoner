import type { PublicProjectTag } from "../types";

interface IProjectTagService {
    getMultipleProjectTagsById(...ids: string[]): Promise<PublicProjectTag[]>;
}

export type { IProjectTagService };
