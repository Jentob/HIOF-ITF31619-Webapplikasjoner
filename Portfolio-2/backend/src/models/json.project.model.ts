import { ProjectArraySchema, type Project } from "../types";

export class DuplicateIdError extends Error {
    constructor(id: string) {
        super(`Project with ID ${id} already exists.`);
    }
}

declare module "bun" {
    interface Env {
        DB_JSON_PROJECTS: string;
    }
}

const databasePath: string =
    process.env.DB_JSON_PROJECTS || "./data/projects.json";
const db = Bun.file(databasePath, { type: "application/json" });

/**
 * Retrieves all projects from the database.
 *
 * @returns A promise that resolves to an array of projects. Returns an empty array if no projects are found.
 */
export const getAllProjects = async (): Promise<Project[]> => {
    const data: unknown = await db.json();
    const projects: Project[] = ProjectArraySchema.parse(data);
    return projects;
};

/**
 * Retrieves a project by its ID.
 *
 * @param id - The unique identifier of the project.
 * @returns A promise that resolves to the project if found, or null if not found.
 */
export const getProjectById = async (id: string): Promise<Project | null> => {
    const projects: Project[] = await getAllProjects();
    const project: Project | undefined = projects.find(
        (project) => project.id === id
    );

    return project || null;
};

/**
 * Adds a new project to the database.
 *
 * @param {Project} project - The project to be added.
 * @returns {Promise<void>} A promise that resolves when the project has been added.
 * @throws {DuplicateIdError} If a project with the same ID already exists.
 */
export const addProject = async (project: Project): Promise<void> => {
    const projects: Project[] = await getAllProjects();

    // ID constraint, sjekker om IDen allerede eksisterer
    const duplicateId: Project | undefined = projects.find(
        (p) => p.id === project.id
    );
    if (duplicateId) {
        throw new DuplicateIdError(project.id);
    }

    projects.push(project);
    await Bun.write(db, JSON.stringify(projects));
};

/**
 * Deletes a project by its ID.
 *
 * @param {string} id The ID of the project to delete.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the project was successfully deleted, or `false` if the project was not found.
 */
export const deleteProject = async (id: string): Promise<boolean> => {
    const projects: Project[] = await getAllProjects();
    const projectIndex: number = projects.findIndex(
        (project) => project.id === id
    );

    if (projectIndex !== -1) {
        projects.splice(projectIndex, 1);
        await Bun.write(db, JSON.stringify(projects));
        return true;
    }
    return false;
};
