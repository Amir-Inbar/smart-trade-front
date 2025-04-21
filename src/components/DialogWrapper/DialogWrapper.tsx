import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import classNames from "classnames";

interface DialogWrapperProps {
    title: string;
    description?: string;
    dialogWidth?: string;
    children: ReactNode;
    openDialogText?: string;
    open?: boolean;
    className?: string;
    onOpenChange(open: boolean): void;
}

export const DialogWrapper = ({
    title,
    description,
    dialogWidth = "w-96",
    openDialogText,
    children,
    open,
    onOpenChange,
    className,
}: DialogWrapperProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" type="button">
                    {openDialogText}
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <DialogContent
                    className={classNames(dialogWidth, className)}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>{description}</DialogDescription>
                    {children}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
