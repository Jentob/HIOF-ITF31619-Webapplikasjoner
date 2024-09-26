import { ReactNode } from "react";

interface Props {
    header: ReactNode;
    children: ReactNode;
}

export default function Layout(props: Props) {
    const { children, header } = props;
    return (
        <>
            <header>{header}</header>
            <main>{children}</main>
        </>
    );
}
