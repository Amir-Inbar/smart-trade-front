import Navbar from "@/components/Layout/Navbar";

interface ContentLayoutProps {
    title: string;
    children: React.ReactNode;
}

export function ContentLayout({title, children}: ContentLayoutProps) {
    return (
        <div>
            <Navbar title={title}/>
            <div className="container pt-8 pb-8">{children}</div>
        </div>
    );
}
