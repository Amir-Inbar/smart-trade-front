import {cva, VariantProps} from "class-variance-authority";
import React, {InputHTMLAttributes} from "react";
import {cn} from "@/lib/utils";
import {InputItemOptions} from "@/components/Scenarios/Scenarios.util";

const inputVariants = cva(
    "block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
);

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, disabled, ...props}, ref) => (
        <input
            ref={ref}
            type={type || "text"}
            className={cn(inputVariants(), className)}
            disabled={disabled}
            {...props}
        />
    )
);
Input.displayName = "Input";

//select

const selectVariants = cva(
    "block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
);

export interface SelectProps
    extends InputHTMLAttributes<HTMLSelectElement>,
        VariantProps<typeof selectVariants> {
    options: InputItemOptions[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({className, ...props}, ref) => (
        <select
            ref={ref}
            className={cn(selectVariants(), className)}
            {...props}
        >
            {props.options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </select>
    )
);

Select.displayName = "Select";

//textarea

const textareaVariants = cva(
    "block w-full rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
);

export interface TextareaProps
    extends InputHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, ...props}, ref) => (
        <textarea
            ref={ref}
            className={cn(textareaVariants(), className)}
            {...props}
        />
    )
);

Textarea.displayName = "Textarea";

export {Input, Select, Textarea};