import "./Project.module.css";
import { Project as P } from "../types";

interface Props {
    project: P;
    remove: (id: string) => void;
}

export default function Project(props: Props) {
    const { project, remove } = props;
    const { id, title, description, url } = project;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        remove(id);
    };

    return (
        <article>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={url}>{url}</a>
            <button onClick={handleClick}>Slett prosjekt</button>
        </article>
    );
}
