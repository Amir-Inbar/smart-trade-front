import Navbar from "@/components/Layout/Navarbar/Navbar";
import {ReactNode} from "react";

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
