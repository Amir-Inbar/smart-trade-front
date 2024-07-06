// Scenarios.tsx
import React from 'react';
import {useTheme} from 'next-themes';
import * as Dialog from '@radix-ui/react-dialog';
import {
    CustomDialog,
    CustomDialogContent,
    CustomDialogHeader,
    CustomDialogTitle,
    CustomDialogDescription,
    CustomDialogContentWrapper,
    CustomDialogFooter,
    CustomDialogCloseButton
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';

const Scenarios: React.FC = () => {
    const {theme} = useTheme();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <CustomDialog>
                    <CustomDialogContent>
                        <CustomDialogHeader>
                            <CustomDialogTitle>Edit profile</CustomDialogTitle>
                            <CustomDialogCloseButton as={Dialog.Close}/>
                        </CustomDialogHeader>
                        <CustomDialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </CustomDialogDescription>
                        <CustomDialogContentWrapper>
                            <fieldset className="mb-4 flex items-center gap-4">
                                <label className="text-right w-24 text-sm font-medium" htmlFor="name">
                                    Name
                                </label>
                                <input className="flex-1 p-2 border rounded" id="name" defaultValue="Pedro Duarte"/>
                            </fieldset>
                            <fieldset className="mb-4 flex items-center gap-4">
                                <label className="text-right w-24 text-sm font-medium" htmlFor="username">
                                    Username
                                </label>
                                <input className="flex-1 p-2 border rounded" id="username" defaultValue="@peduarte"/>
                            </fieldset>
                        </CustomDialogContentWrapper>
                        <CustomDialogFooter>
                            <Dialog.Close asChild>
                                <Button variant="outline" color="red">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" variant="outline">
                                Save
                            </Button>
                        </CustomDialogFooter>
                    </CustomDialogContent>
                </CustomDialog>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Scenarios;
