import {
    type Project,
    type CreateProject,
    type PublicProject,
    PublicProjectArraySchema,
    PublicProjectSchema,
} from "../types";
import { jsonProjectModel as pm } from "../models";

export const getAllProjects = async (): Promise<PublicProject[]> => {
    const projects = await pm.getAllProjects();
    const publicProjects: PublicProject[] =
        PublicProjectArraySchema.parse(projects);
    return publicProjects;
};

export const getProjectById = async (
    id: string
): Promise<PublicProject | null> => {
    const project = await pm.getProjectById(id);
    if (project) {
        return PublicProjectSchema.parse(project);
    } else {
        return null;
    }
};

export const createProject = async (
    project: CreateProject
): Promise<PublicProject> => {
    const privateProject: Project = {
        ...project,
        id: crypto.randomUUID(),
        type: "project",
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };

    pm.addProject(privateProject);

    const publicProject: PublicProject =
        PublicProjectSchema.parse(privateProject);

    return publicProject;
};

export const deleteProject = async (id: string): Promise<boolean> => {
    return pm.deleteProject(id);
};
