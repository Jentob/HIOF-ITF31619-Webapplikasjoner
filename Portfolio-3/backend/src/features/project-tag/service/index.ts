import type { IProjectTagRepository } from "../repository/interface";
import type { InternalProjectTag } from "../types";
import type { IProjectTagService } from "./interface";

class ProjectTagService implements IProjectTagService {
    private readonly ptr: IProjectTagRepository;

    constructor(projectRepository: IProjectTagRepository) {
        this.ptr = projectRepository;
    }

    getMultipleProjectTagsById = async (
        ...ids: string[]
    ): Promise<InternalProjectTag[]> => {
        const tags = this.ptr.getMultipleById(...ids);
        return tags;
    };
}

const createProjectTagService = (repository: IProjectTagRepository) =>
    new ProjectTagService(repository);

export default createProjectTagService;
