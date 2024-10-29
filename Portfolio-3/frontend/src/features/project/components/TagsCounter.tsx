import { Project, ProjectTag } from "../types";

interface Props {
    projects: Project[];
    tags: ProjectTag[];
}

interface TagProps {
    tag: string;
    count: number;
}

export default function TagsCounter(props: Props) {
    const { projects, tags } = props;
    const tagsMap: Map<string, { name: string; count: number }> =
        projects.reduce((acc, project) => {
            project.tags.forEach((tag) => {
                const pre = acc.get(tag) || { count: 0, name: tag };
                acc.set(tag, {
                    count: pre.count + 1,
                    name: tags.find((t) => t.id === tag)?.name || tag,
                });
            });
            return acc;
        }, new Map());

    return (
        <div>
            <ul>
                {Array.from(tagsMap).map(([id, tag]) => (
                    <Tag key={id} tag={tag.name} count={tag.count} />
                ))}
            </ul>
        </div>
    );
}

function Tag(props: TagProps) {
    const { tag, count } = props;

    return (
        <li>
            {tag}: {count}
        </li>
    );
}
