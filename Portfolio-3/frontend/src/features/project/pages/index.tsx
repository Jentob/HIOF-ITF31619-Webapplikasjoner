import ProjectCollection from "../components/Collection";
import CreateProjectForm from "../components/CreateProjectForm";
import { useProjects } from "../hooks";

export default function ProjectPage() {
    const projects = useProjects();
    return (
        <>
            <ProjectCollection {...projects} />
            <CreateProjectForm createProjectFunction={projects.add} />
        </>
    );
}
