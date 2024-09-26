import {
    type CreateProject,
    type PublicProject,
    PublicProjectArraySchema,
    PublicProjectSchema,
} from "../types/project";

export const getProjectData = async (
    url: URL
): Promise<
    { success: true; data: PublicProject[] } | { success: false; error: Error }
> => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data: PublicProjectArraySchema.parse(data.data),
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

export const createProject = async (
    url: URL,
    project: CreateProject
): Promise<
    { success: true; data: PublicProject } | { success: false; error: Error }
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
                data: PublicProjectSchema.parse(responseData.data),
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
