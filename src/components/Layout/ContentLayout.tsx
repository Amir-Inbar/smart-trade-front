import {ReactNode} from "react";
import {Navbar} from "@/components/Layout/Navarbar/Navbar.tsx";

interface ContentLayoutProps {
    title: string;
    children: ReactNode;
}

export function ContentLayout({title, children}: ContentLayoutProps) {
    return (
        <div>
            <Navbar title={title}/>
            <div className="container pt-8 pb-8">{children}</div>
        </div>
    );
}
