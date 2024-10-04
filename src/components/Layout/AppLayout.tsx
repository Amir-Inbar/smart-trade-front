"use client";

import {cn} from "@/lib/utils";
import {useStore} from "@/hooks/use-store";
import {AppFooter} from "@/components/Layout/AppFooter";
import {AppSideBar} from "@/components/Layout/AppSideBar/AppSideBar";
import {useSidebarToggle} from "@/hooks/use-sidebar-toggle";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {ReactNode} from "react";

export const
    AppLayout = ({
                     children
                 }: {
        children: ReactNode;
    }) => {
        const sidebar = useStore(useSidebarToggle, (state) => state);

        if (!sidebar) {
            return null;
        }

        return (
            <Provider store={store}>
                <AppSideBar/>
                <main
                    className={cn(
                        "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
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
            </Provider>
        );
    }
