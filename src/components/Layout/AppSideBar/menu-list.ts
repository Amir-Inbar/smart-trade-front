import {
    Bookmark,
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
            ]
        },
    ];
}
