import { endpoints } from "../../../config/url";
import {
    ProjectArraySchema,
    ProjectSchema,
    ProjectTagArraySchema,
} from "../schema";
import { CreateProject, Project, ProjectTag } from "../types";

const url = endpoints.projects;

const getData = async (): Promise<
    | { success: true; data: { projects: Project[]; tags: ProjectTag[] } }
    | { success: false; error: Error }
> => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data: {
                    projects: ProjectArraySchema.parse(data.data.projects),
                    tags: ProjectTagArraySchema.parse(data.data.tags),
                },
            };
        } else {
            throw new Error("Response code: " + response.status);
        }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error };
        }
        return {
            success: false,
            error: new Error("An unknown error occurred"),
        };
    }
};

const create = async (
    project: CreateProject
): Promise<
    { success: true; data: Project } | { success: false; error: Error }
> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });

        const responseData = await response.json();
        if (response.status === 201) {
            return {
                success: true,
                data: ProjectSchema.parse(responseData.data.project),
            };
        } else {
            throw new Error(
                "Response code: " +
                    response.status +
                    " Response data: " +
                    responseData.json
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error };
        }
        return {
            success: false,
            error: new Error("An unknown error occurred"),
        };
    }
};

const remove = async (id: string) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error(error);
    }
};

export default { getData, create, remove };
