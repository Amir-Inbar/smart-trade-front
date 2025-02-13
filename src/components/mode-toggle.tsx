import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import {MoonIcon, SunIcon} from "lucide-react";
import {useMantineColorScheme} from "@mantine/core";

export function ModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );
    const {toggleColorScheme} = useMantineColorScheme();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            toggleColorScheme("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            toggleColorScheme("light");
        }
    }, [isDarkMode]);

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="rounded-full w-8 h-8 bg-background"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                    >
                        <SunIcon
                            className={`w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 ${
                                isDarkMode ? "" : "rotate-0 scale-100"
                            }`}
                        />
                        <MoonIcon
                            className={`absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-transform ease-in-out duration-500 ${
                                isDarkMode ? "-rotate-90 scale-0" : ""
                            }`}
                        />
                        <span className="sr-only">Switch Theme</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Switch Theme</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
