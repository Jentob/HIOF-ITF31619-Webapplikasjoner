import "./Project.module.css";
import { PublicProject as Props } from "../../types/project";

export type ProjectProps = Props;

export default function Project(props: Props) {
    const { title, description, url } = props;
    return (
        <article>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={url}>{url}</a>
        </article>
    );
}
