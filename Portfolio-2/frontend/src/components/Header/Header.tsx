import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function Header(props: Props) {
    const { children } = props;
    return <>{children}</>;
}
