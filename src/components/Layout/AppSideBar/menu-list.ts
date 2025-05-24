import {
    Bookmark,
    BarChart2, Calendar
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: any;
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "/scenarios",
                    label: "Scenarios",
                    active: pathname.includes("/scenarios"),
                    icon: Bookmark,
                    submenus: []
                },
                {
                    href: "/trades",
                    label: "Trades",
                    active: pathname.includes("/trades"),
                    icon: BarChart2,
                    submenus: []
                },
                {
                    href: "/calendar",
                    label: "Calendar",
                    active: pathname.includes("/calendar"),
                    icon: Calendar,
                    submenus: []
                },
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: BarChart2,
                    submenus: []
                }
            ]
        }
    ];
}
