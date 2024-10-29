import type { InternalProjectTag, SelectProjectTag } from "../types";

export const dbMappers = {
    selectToInternal: (project: SelectProjectTag): InternalProjectTag => {
        return {
            id: project.id,
            name: project.name,
            type: "project-tag",
        };
    },
};
