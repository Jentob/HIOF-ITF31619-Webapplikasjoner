import type { InsertProject, PublicProject, UpdateProject } from "../types";

interface IProjectService {
    getAllProjects(role: "admin" | "user"): Promise<PublicProject[]>;

    getProjectById(id: string): Promise<PublicProject>;

    createProject(project: InsertProject): Promise<PublicProject>;

    deleteProject(id: string): Promise<string>;

    updateProject(project: UpdateProject): Promise<PublicProject>;
}

export type { IProjectService };
