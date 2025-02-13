import {FieldValues, UseFormReturn} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {DialogClose, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {Spinner} from "@/components/ui/spinner";

interface DialogFormProps<T> {
    submitText?: string;
    children: ReactNode;
    form: UseFormReturn<T & FieldValues>;

    onSubmit(data: T): void;

    onClose(): void;
}

export const DialogForm = <T, >(
    {
        onSubmit,
        onClose,
        form,
        submitText,
        children,
    }: DialogFormProps<T>
) => {

    const {
        handleSubmit,
        formState: {isSubmitting, errors}
    } = form;

    const displayErrors = Object.values(errors).map((key) => key?.message);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}
                {displayErrors.map((error, index) => (
                    <div key={index} className="text-red-500 text-sm">
                        {error as string || ""}
                    </div>
                ))}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" color="red" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} type="submit" variant="outline">
                        {isSubmitting ? <Spinner/> : submitText || "Submit"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
};
