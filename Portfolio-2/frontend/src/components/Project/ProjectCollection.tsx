import Project, { ProjectProps } from "./Project";
import TagsCounter from "./TagsCounter";

interface Props {
    projects: ProjectProps[];
}

export default function Projects(props: Props) {
    const { projects } = props;
    return (
        <section>
            <h2>Prosjekter</h2>
            <TagsCounter projects={projects} ></TagsCounter>
            {projects && projects?.length > 0 ? (
                projects.map((e, index) => <Project key={index} {...e} />)
            ) : (
                <p>Ingen prosjekter</p>
            )}
        </section>
    );
}
