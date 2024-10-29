import Skill, { SkillProps } from "./Skill";

interface Props {
    skills: SkillProps[];
}

export default function Skills(props: Props) {
    const { skills } = props;
    return (
        <section>
            <h2>Ferdigheter</h2>
            {skills.length > 0 ? (
                <ul>
                    {skills.map((e, index) => (
                        <Skill key={index} {...e} />
                    ))}
                </ul>
            ) : (
                <p>Ingen erfaring</p>
            )}
        </section>
    );
}
