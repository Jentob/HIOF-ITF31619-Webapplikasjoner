import { Skill as Props } from "../../types";

export type SkillProps = Props;

export default function Skill(props: Props) {
    const { name } = props;

    return <li>{name}</li>;
}
