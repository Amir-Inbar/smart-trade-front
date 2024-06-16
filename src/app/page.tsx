import Link from "next/link";
import {PanelsTopLeft} from "lucide-react";
import {GitHubLogoIcon} from "@radix-ui/react-icons";

import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/mode-toggle";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header
                className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
                <div className="container h-14 flex items-center">
                    <Link
                        href="/"
                        className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
                    >
                        <PanelsTopLeft className="w-6 h-6 mr-3"/>
                        <span className="font-bold">shadcn/ui sidebar</span>
                        <span className="sr-only">shadcn/ui sidebar</span>
                    </Link>
                    <nav className="ml-auto flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-8 h-8 bg-background"
                            asChild
                        >
                            <Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
                                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]"/>
                            </Link>
                        </Button>
                        <ModeToggle/>
                    </nav>
                </div>
            </header>
            <main className="min-h-[calc(100vh-57px-97px)] flex-1">
                application content
            </main>
            <footer className="py-6 md:py-0 border-t border-border/40">
                <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
                        Smart Trade
                    </p>
                </div>
            </footer>
        </div>
    );
}
