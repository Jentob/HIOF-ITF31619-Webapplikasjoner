import FrontPageHeader from "./components/FrontPageHeader";
import AboutMe from "./features/student/components/AboutMe";
import Contact from "./features/student/components/Contact";
import Skills from "./features/student/components/Skill/SkillCollection";
import { useStudent } from "./features/student/hooks";
import Layout from "./layouts/Layout";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function App(props: Props) {
    const { children } = props;

    const { student } = useStudent();

    return (
        <Layout header={<FrontPageHeader {...student} />}>
            <AboutMe {...student} />
            <Skills {...student} />
            <Contact {...student} />
            {children}
        </Layout>
    );
}

export default App;
