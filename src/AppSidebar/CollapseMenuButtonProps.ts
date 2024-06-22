import {LucideIcon} from "lucide-react";
import {Submenu} from "@/types/AppSidebar/SubMenu";

export interface CollapseMenuButtonProps {
    icon: LucideIcon;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
}