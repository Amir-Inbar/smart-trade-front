"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface DialogWrapperProps {
  title: string;
  description: string;
  dialogWidth?: string;
  children: ReactNode;
  openDialogText?: string;
  open?: boolean;

  onOpenChange: (open: boolean) => void;
}

export const DialogWrapper = ({
                                title,
                                description,
                                dialogWidth,
                                openDialogText,
                                children,
                                open,
                                onOpenChange
                              }: DialogWrapperProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <Button variant="outline" type="button">
        {openDialogText}
      </Button>
    </DialogTrigger>
    <DialogPortal>
      <DialogContent className={`w-[${dialogWidth || "600px"}]`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
