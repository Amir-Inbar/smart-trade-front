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
import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

interface DialogWrapperProps {
  title: string;
  description: string;
  dialogWidth?: string;
  children: ReactNode;
  openDialogText?: string;
  open?: boolean;

  onOpenModal(): void;
}

export const DialogWrapper = ({
                                title,
                                description,
                                dialogWidth,
                                openDialogText,
                                children,
                                open,
                                onOpenModal
                              }: DialogWrapperProps) => {
  const [isOpen, setIsOpen] = useState(open);

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" onClick={onOpenModal}>
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
};

