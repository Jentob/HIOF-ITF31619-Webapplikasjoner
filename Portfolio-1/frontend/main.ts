import "./style.css";
import { ProjectArraySchema, type CreateProject, type Project } from "../types";
import { ZodError } from "zod";

const apiUrl: URL = new URL("http://localhost:3001");
const projectsApiUrl: URL = new URL(apiUrl + "projects");

const projectsData: Project[] = [];

const createProjectForm: HTMLFormElement = document.getElementById(
    "project-form"
) as HTMLFormElement;
const projectListSection: HTMLDivElement = document.getElementById(
    "project-section"
) as HTMLDivElement;

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderProjects(projects: Project[]): void {
    if (projects.length === 0) {
        projectListSection.innerHTML = `
            <div class="info">
                <p>Ingen prosjekter er lagt til</p>
            </div>
        `;
        return;
    }

    projectListSection.innerHTML = "";

    const ulistElement = document.createElement("ul");
    for (const p of projects) {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.body)}</p>
            <a href="${escapeHtml(p.url)}">${escapeHtml(p.url)}</a>
        `;
        ulistElement.appendChild(liElement);
    }
    projectListSection.appendChild(ulistElement);
}

function renderError(error: string): void {
    projectListSection.innerHTML = "";

    const errorElement = document.createElement("div");
    errorElement.className = "error";

    const errorTextElement = document.createElement("p");
    errorTextElement.innerText = error;

    errorElement.appendChild(errorTextElement);
    projectListSection.appendChild(errorElement);
}

// TODO: ???
function renderFormError(error: string): void {
    const errorElement = document.createElement("div");
    const errorTextElement = document.createElement("p");
    errorElement.appendChild(errorTextElement);
    errorTextElement.innerText = error;

    createProjectForm.appendChild(errorElement);

    setTimeout(() => {
        errorElement.remove();
    }, 6000);
}

async function getProjects(url: URL): Promise<Project[]> {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return ProjectArraySchema.parse(data);
    }
    throw new Error("Feil ved henting av data fra serveren");
}

async function createProject(
    url: URL,
    project: CreateProject
): Promise<Project> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    });

    if (response.status === 201) {
        const responseData: Project = await response.json();
        return responseData;
    } else {
        throw new Error("Feil ved lagring av prosjekt");
    }
}

async function getProjectsAndRender(
    url: URL,
    projects: Project[]
): Promise<void> {
    try {
        const data: Project[] = await getProjects(url);
        projects.push(...data);
        renderProjects(projects);
    } catch (error) {
        if (error instanceof ZodError) {
            renderError("Validering av data feilet");
        } else if (error instanceof Error) {
            console.log(error);
            renderError(error.message);
        }
    }
}

async function createProjectAndRender(
    url: URL,
    project: CreateProject,
    projects: Project[]
): Promise<void> {
    try {
        projects.push(await createProject(url, project));
        renderProjects(projects);
    } catch (error) {
        console.log(error);
        renderFormError("Feil ved lagring av prosjekt");
    }
}

createProjectForm.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    const newProject: CreateProject = {
        title: (
            (event.target as HTMLFormElement).elements.namedItem(
                "title"
            ) as HTMLInputElement
        ).value,
        body: (
            (event.target as HTMLFormElement).elements.namedItem(
                "body"
            ) as HTMLInputElement
        ).value,
        url: (
            (event.target as HTMLFormElement).elements.namedItem(
                "url"
            ) as HTMLInputElement
        ).value,
    };

    createProjectAndRender(projectsApiUrl, newProject, projectsData);
});

getProjectsAndRender(projectsApiUrl, projectsData);
