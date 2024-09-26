import { useEffect, useState } from "react";
import { type Student } from "./types/student";
import { type CreateProject, type PublicProject } from "./types/project";
import { createProject, getProjectData } from "./api/projects";
import Layout from "./layouts/Layout";
import Contact from "./components/Contact/Contact";
import Skills from "./components/Skill/SkillCollection";
import Projects from "./components/Project/ProjectCollection";
import CreateProjectForm from "./components/Project/CreateProjectForm";
import FrontPageHeader from "./components/Header/FrontPageHeader";
import AboutMe from "./components/AboutMe/AboutMe";

const apiUrl = new URL("http://localhost:3001");
const projectsUrl = new URL("/projects", apiUrl);

function App() {
    const [projects, setProjects] = useState<PublicProject[]>([]);

    const student: Student = {
        name: "Tobias Jensen",
        email: "tobiasje@hiof.no",
        about: "Jeg er en student som tar en bachelor i informatikk ved Høgskolen i Østfold. Jeg kan lage nettsider (som delvis funker).",
        skills: [
            { name: "Python" },
            { name: "Linux" },
            { name: "Relasjonsdatabaser" },
            { name: "Git / Github" },
            { name: "JavaScript og litt TypeScript" },
            { name: "Litt PHP" },
        ],
    };

    useEffect(() => {
        const fetchData = async () => {
            getProjectData(projectsUrl).then((data) => {
                if (data.success) {
                    setProjects(data.data);
                } else {
                    console.error(data.error);
                }
            });
        };

        fetchData();
    }, []);

    const createProjectWrapper = async (project: CreateProject) => {
        const result = await createProject(projectsUrl, project);
        if (result.success) {
            setProjects((prevProjects) => [...prevProjects, result.data]);
        } else {
            console.error(result.error);
        }
    };

    return (
        <>
            <Layout header={<FrontPageHeader {...student} />}>
                <AboutMe {...student} />
                <Skills {...student} />
                <Contact {...student} />
                <Projects projects={projects} />
                <CreateProjectForm
                    createProjectFunction={createProjectWrapper}
                />
            </Layout>
        </>
    );
}

export default App;
