import { PublicProject } from "../../types/project";

interface Props {
    projects: PublicProject[];
}

interface TagProps {
    tag: string;
    count: number;
}

export default function TagsCounter(props: Props) {
    const { projects } = props;
    const tags: Map<string, number> = projects.reduce((acc, project) => {
        project.tags.forEach(tag => {
            acc.set(tag.name, (acc.get(tag.name) || 0) + 1);
        }); 
        return acc;
    }, new Map());

    return (
        <div>
            <ul>
                {Array.from(tags).map(([tag, count]) => (
                    <Tag key={tag} tag={tag} count={count} />
                ))}
            </ul>
        </div>
    );
};

function Tag(props: TagProps) {
    const { tag, count } = props;

    return (
        <li>
            {tag}: {count}
        </li>
    );
}