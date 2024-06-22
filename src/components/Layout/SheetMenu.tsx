import Link from "next/link";
import {MenuIcon, PanelsTopLeft} from "lucide-react";

import {Button} from "@/components/ui/button";
import AppSideBarMenu from "@/components/Layout/AppSideBarMenu";
import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const SheetMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20}/>
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
                <SheetHeader>
                    <Button
                        className="flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <PanelsTopLeft className="w-6 h-6 mr-1"/>
                            <h1 className="font-bold text-lg">Brand</h1>
                        </Link>
                    </Button>
                </SheetHeader>
                <AppSideBarMenu isOpen/>
            </SheetContent>
        </Sheet>
    );
}

export default SheetMenu;