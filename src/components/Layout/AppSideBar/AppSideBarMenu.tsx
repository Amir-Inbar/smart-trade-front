import {getMenuList} from "@/components/Layout/AppSideBar/menu-list";
import MenuGroup from "./MenuGroup";
import MenuItem from "./MenuItem";
import SignOutButton from "./SignOutButton";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CollapseMenuButton} from "@/components/Layout/CollapseMenuButton";

interface MenuProps {
    isOpen: boolean | undefined;
}

const AppSideBarMenu = ({isOpen}: MenuProps) => {
    const pathname = "/home";
    const menuList = getMenuList(pathname);

    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="mt-8 h-full w-full">
                <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
                    {menuList.map(({groupLabel, menus}, index) => (
                        <MenuGroup groupLabel={groupLabel} isOpen={isOpen} key={index}>
                            {menus.map(({href, label, icon: Icon, active, submenus}, index) =>
                                submenus.length === 0 ? (
                                    <MenuItem
                                        key={index}
                                        href={href}
                                        label={label}
                                        Icon={Icon}
                                        active={active}
                                        isOpen={isOpen}
                                    />
                                ) : (
                                    <div className="w-full" key={index}>
                                        <CollapseMenuButton
                                            icon={Icon}
                                            label={label}
                                            active={active}
                                            submenus={submenus}
                                            isOpen={isOpen}
                                        />
                                    </div>
                                )
                            )}
                        </MenuGroup>
                    ))}
                    <SignOutButton isOpen={isOpen}/>
                </ul>
            </nav>
        </ScrollArea>
    );
};

export default AppSideBarMenu;
