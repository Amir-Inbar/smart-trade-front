import {ChevronLeft} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface SidebarToggleProps {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
}

const SidebarToggle = ({isOpen, setIsOpen}: SidebarToggleProps) => {

    return (
        <div
            className={cn(
                "invisible lg:visible absolute top-[12px] -right-[16px] z-20 bg-white dark:bg-primary-foreground",
            )}>
            <Button
                onClick={() => setIsOpen?.()}
                variant="outline"
                size="icon"
            >
                <ChevronLeft
                    className={cn(
                        "h-4 w-4 transition-transform ease-in-out duration-700",
                        isOpen === false ? "rotate-180" : "rotate-0"
                    )}
                />
            </Button>
        </div>
    );
}

export default SidebarToggle