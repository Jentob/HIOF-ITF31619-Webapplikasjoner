import { Student } from "../types";

interface Props {
    about: Student["about"];
}

export default function AboutMe(props: Props) {
    const { about } = props;

    return (
        <section>
            <h2>Om meg</h2>
            <p>{about}</p>
        </section>
    );
}
