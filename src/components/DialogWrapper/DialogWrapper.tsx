'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogPortal,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, {ReactNode} from "react";
import {Button} from "@/components/ui/button";

interface DialogWrapperProps {
    title: string;
    description: string;
    dialogWidth?: string;
    children: ReactNode;
    openDialogText?: string;
}

export const DialogWrapper = ({title, description, dialogWidth, openDialogText, children}: DialogWrapperProps) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" type='button'>
                {openDialogText}
            </Button>
        </DialogTrigger>
        <DialogPortal>
            <DialogContent className={`w-[${dialogWidth || '600px'}]`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{description}</DialogDescription>
                {children}
            </DialogContent>
        </DialogPortal>
    </Dialog>
)