import { useState } from "react";
import type { CreateProject } from "../types";

interface Props {
    createProjectFunction: (project: CreateProject) => void;
}

export default function CreateProjectForm(props: Props) {
    const [formData, setFormData] = useState<CreateProject>({
        title: "",
        description: "",
        url: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.title && formData.description && formData.url) {
            props.createProjectFunction(formData);
            setFormData(() => ({
                title: "",
                description: "",
                url: "",
            }));
        } else {
            alert("All fields are required!");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Legg til prosjekt</legend>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="description">Body</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <label htmlFor="url">URL</label>
                    <input
                        type="url"
                        name="url"
                        id="url"
                        required
                        value={formData.url}
                        onChange={handleChange}
                    />
                    <button type="submit">Create Project</button>
                </fieldset>
            </form>
        </>
    );
}
