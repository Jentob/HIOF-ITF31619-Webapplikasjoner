import { useCallback, useEffect, useState } from "react";
import projectApi from "../services/api";
import type { CreateProject, Project, ProjectTag } from "../types";

function useProjects() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);

    const isLoading = !!loading;
    const isError = !!error;

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await projectApi.getData();
            if (data.success) {
                const { projects, tags } = data.data;
                setProjects(projects ?? []);
                setProjectTags(tags ?? []);
            } else {
                throw new Error();
            }
        } catch (error) {
            setError("Feilet ved henting av data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const add = async (data: CreateProject) => {
        try {
            setLoading(true);
            await projectApi.create(data);
        } catch (error) {
            setError("Failed creating project");
        } finally {
            setLoading(false);
            await fetchData();
        }
    };

    const remove = async (id: string) => {
        try {
            setLoading(true);
            await projectApi.remove(id);
        } catch (error) {
            setError("Failed removing item");
        } finally {
            setLoading(false);
            await fetchData();
        }
    };

    return {
        add,
        remove,
        get: fetchData,
        isLoading,
        isError,
        projects,
        projectTags,
        error,
    };
}

export { useProjects };
