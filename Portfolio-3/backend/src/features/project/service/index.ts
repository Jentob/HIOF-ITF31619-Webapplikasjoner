import type {
    InsertProject,
    InternalProject,
    PublicProject,
    UpdateProject,
} from "../types";
import { toPublic } from "../helpers";
import type { IProjectService } from "./interface";
import type { IProjectRepository } from "../repository/interface";

class ProjectService implements IProjectService {
    private readonly pr: IProjectRepository;

    constructor(projectRepository: IProjectRepository) {
        this.pr = projectRepository;
    }

    getAllProjects = async (role: "admin" | "user"): Promise<PublicProject[]> => {
        const projects: InternalProject[] = [];
        if (role === "admin") {
            projects.push(...(await this.pr.get()));
        } else {
            projects.push(...(await this.pr.get({public: true})));
        }
        return toPublic.array(projects);
    };

    getProjectById = async (id: string): Promise<PublicProject> => {
        const project = await this.pr.getById(id);
        return toPublic.single(project);
    };

    createProject = async (project: InsertProject): Promise<PublicProject> => {
        const newProject = await this.pr.create(project);
        return toPublic.single(newProject);
    };

    deleteProject = async (id: string): Promise<string> => {
        const result = await this.pr.delete(id);
        return result;
    };

    updateProject = async (project: UpdateProject): Promise<PublicProject> => {
        const updatedProject = await this.pr.update(project);
        return toPublic.single(updatedProject);
    };
}

const createProjectService = (repository: IProjectRepository) =>
    new ProjectService(repository);

export default createProjectService;
