import {Ellipsis} from "lucide-react";
import {Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

interface MenuGroupProps {
    groupLabel: string | undefined;
    isOpen: boolean | undefined;
    children: React.ReactNode;
}

const MenuGroup = ({groupLabel, isOpen, children}: MenuGroupProps) => {
    return (
        <li className={cn("w-full", groupLabel ? "pt-5" : "")}>
            {groupLabel && (isOpen || isOpen === undefined) ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {groupLabel}
                </p>
            ) : !isOpen && groupLabel ? (
                <TooltipProvider>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger className="w-full">
                            <div className="w-full flex justify-center items-center">
                                <Ellipsis className="h-5 w-5"/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{groupLabel}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <p className="pb-2"/>
            )}
            {children}
        </li>
    );
};

export default MenuGroup;
