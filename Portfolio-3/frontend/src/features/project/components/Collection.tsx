import type { Project as ProjectType, ProjectTag } from "../types";
import Project from "./Project";
import TagsCounter from "./TagsCounter";

interface Props {
    projects: ProjectType[];
    projectTags: ProjectTag[];
    remove: (id: string) => void;
}

export default function ProjectCollection(props: Props) {
    const { projects, projectTags, remove } = props;
    return (
        <section>
            <h2>Prosjekter</h2>
            <TagsCounter projects={projects} tags={projectTags}></TagsCounter>
            {projects && projects?.length > 0 ? (
                projects.map((e, index) => <Project key={index} project={e} remove={remove}  />)
            ) : (
                <p>Ingen prosjekter</p>
            )}
        </section>
    );
}
