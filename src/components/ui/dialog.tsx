import React from 'react';
import {Cross2Icon} from '@radix-ui/react-icons';
import {cn} from '@/lib/utils';
import {useTheme} from 'next-themes';
import {Button} from "@/components/ui/button";

const CustomDialog = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => {
        const theme = useTheme();

        return (
            <div
                ref={ref}
                className={cn(
                    'fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center',
                    className
                )}
                {...props}
            />
        );
    }
);
CustomDialog.displayName = 'CustomDialog';

const CustomDialogContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => {
    const {theme} = useTheme();

    return (
        <div
            ref={ref}
            className={cn(
                'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-md p-4',
                theme === 'dark' ? 'bg-dark' : 'bg-white',
                className
            )}
            {...props}
        />
    );
});
CustomDialogContent.displayName = 'CustomDialogContent';

const CustomDialogHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn('flex justify-between items-center border-b pb-2', className)}
        {...props}
    />
));
CustomDialogHeader.displayName = 'CustomDialogHeader';

const CustomDialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.ComponentPropsWithoutRef<'h2'>
>(({className, ...props}, ref) => (
    <h2
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        {...props}
    />
));
CustomDialogTitle.displayName = 'CustomDialogTitle';

const CustomDialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.ComponentPropsWithoutRef<'p'>
>(({className, ...props}, ref) => {
    const {theme} = useTheme();

    return (
        <p
            ref={ref}
            className={cn('text-sm mt-2', theme === 'dark' ? 'text-gray-400' : 'text-gray-500', className)}
            {...props}
        />
    );
});

CustomDialogDescription.displayName = 'CustomDialogDescription';

const CustomDialogContentWrapper = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn('mt-4', className)} {...props} />
));
CustomDialogContentWrapper.displayName = 'CustomDialogContentWrapper';

const CustomDialogFooter = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<'div'>
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn('flex justify-end mt-4', className)} {...props} />
));
CustomDialogFooter.displayName = 'CustomDialogFooter';

const CustomDialogCloseButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<'button'> & { as?: React.ElementType }
>(({className, ...props}, ref) => (
    <button
        ref={ref}
        className={cn(
            'absolute top-2 right-2 p-1 rounded-full focus:outline-none',
            className
        )}
        aria-label="Close"
        {...props}
    >
        <Cross2Icon/>
    </button>
));
CustomDialogCloseButton.displayName = 'CustomDialogCloseButton';

export {
    CustomDialog,
    CustomDialogContent,
    CustomDialogHeader,
    CustomDialogTitle,
    CustomDialogDescription,
    CustomDialogContentWrapper,
    CustomDialogFooter,
    CustomDialogCloseButton,
};