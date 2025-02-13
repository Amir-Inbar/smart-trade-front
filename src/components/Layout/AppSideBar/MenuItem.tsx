import {Button} from "@/components/ui/button";
import {Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {Link} from "react-router-dom";

interface MenuItemProps {
    href: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    active: boolean;
    isOpen: boolean | undefined;
}

const MenuItem = ({href, label, Icon, active, isOpen}: MenuItemProps) => {
    return (
        <div className="w-full">
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <Button
                            variant={active ? "secondary" : "ghost"}
                            className="w-full justify-start h-10 mb-1"
                            asChild
                        >
                            <Link to={href}>
                                <span className={cn(isOpen === false ? "" : "mr-4")}>
                                    <Icon size={18}/>
                                </span>
                                <p
                                    className={cn(
                                        "max-w-[200px] truncate",
                                        isOpen === false
                                            ? "-translate-x-96 opacity-0"
                                            : "translate-x-0 opacity-100",
                                    )}
                                >
                                    {label}
                                </p>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    {isOpen === false && (
                        <TooltipContent side="right">{label}</TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default MenuItem;
