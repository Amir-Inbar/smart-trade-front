import {cn} from "@/lib/utils";
import {useStore} from "@/hooks/use-store";
import {AppFooter} from "@/components/Layout/AppFooter";
import {AppSideBar} from "@/components/Layout/AppSideBar/AppSideBar";
import {useSidebarToggle} from "@/hooks/use-sidebar-toggle";
import {ReactNode} from "react";
import {FetchDataInBackground} from "@/components/FetchDataInBackground/FetchDataInBackground";

export const AppLayout = ({children}: { children: ReactNode }) => {
    const sidebar = useStore(useSidebarToggle, (state) => state);

    if (!sidebar) {
        return null;
    }

    return (
        <>
            <FetchDataInBackground/>
            <AppSideBar/>
            <main
                className={cn(
                    "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                {children}
            </main>
            <footer
                className={cn(
                    "transition-[margin-left] ease-in-out duration-300",
                    sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
                )}
            >
                <AppFooter/>
            </footer>
        </>
    );
};
