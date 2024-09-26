import { Student } from "../../types/student";

interface Props {
    name: Student["name"];
}

const FrontPageHeader = (props: Props) => {
    const { name } = props;
    return <h1>{name} Portefølje</h1>;
};

export default FrontPageHeader;
