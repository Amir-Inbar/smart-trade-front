import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
    CustomDialog,
    CustomDialogContent,
    CustomDialogHeader,
    CustomDialogTitle,
    CustomDialogDescription,
    CustomDialogContentWrapper,
    CustomDialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {useForm, SubmitHandler, Controller, useFieldArray} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
    BracketOrderSchemaFormValues,
    BracketOrderSchema,
    BracketOrderSchemaInputData,
    InputItem, TakeProfitLevel
} from '@/components/Scenarios/Scenarios.util';
import {Input, Select} from "@/components/ui/input";

const Scenarios: React.FC = () => {
    const {handleSubmit, formState: {errors}, control} = useForm<BracketOrderSchemaFormValues>({
        resolver: yupResolver(BracketOrderSchema),
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "takeProfitLevels",
    });

    const onSubmit: SubmitHandler<BracketOrderSchemaFormValues> = data => {
        console.log(data);
    };

    const chooseInputToRender = (item: InputItem, field: any) => {
        // if (item.type === 'select') {
        //     console.log(item)
        //     return (
        //         <Select
        //             className="w-full border border-gray-300 rounded-md p-2"
        //             options={item.options || []}
        //             {...item}
        //             {...field}
        //         />
        //     );
        // }
        if (item.type === 'array') {
            return (
                <Input
                    {...item}
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder={item.placeholder}
                />
            );
        }

        if (item.type === 'number') {
            return (
                <Input
                    {...item}
                    {...field}
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder={item.placeholder}
                />
            );
        }

        return (
            <Input
                {...item}
                {...field}
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder={item.placeholder}
            />
        );
    }


    // const renderErrorMessages = (index: number) => {
    //     const errorFields = ["price", "quantity"];
    //     return errorFields.map(field => (
    //         errors.takeProfitLevels?.[index]?.[field] && (
    //             <span key={field} className="text-red-500 text-sm mt-1 block">
    //                 {errors.takeProfitLevels[index][field]?.message}
    //             </span>
    //         )
    //     ));
    // };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <CustomDialog>
                    <CustomDialogContent className='w-[600px]'>
                        <CustomDialogHeader>
                            <CustomDialogTitle>Create Bracket Order</CustomDialogTitle>
                        </CustomDialogHeader>
                        <CustomDialogDescription>
                            The bracket order is a complex order type that allows you to set a stop loss and take profit
                            order at the same time.
                        </CustomDialogDescription>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CustomDialogContentWrapper>
                                <div className='h-[600px] overflow-y-auto'>
                                    {BracketOrderSchemaInputData.map((item) => (
                                        item.name !== 'takeProfitLevels' ? (
                                            <div key={item.name} className="mb-4 mr-4">
                                                <label className="block text-sm font-medium mb-1" htmlFor={item.name}>
                                                    {item.label}
                                                </label>
                                                <Controller
                                                    name={item.name}
                                                    control={control}
                                                    defaultValue={item.default}
                                                    render={({field}) => (
                                                        <>
                                                            {chooseInputToRender(item, field)}
                                                            {errors[item.name] && (
                                                                <span className="text-red-500 text-sm mt-1 block">
                                                                    {errors[item.name]?.message}
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                        ) : (
                                            <div key={item.name} className="mb-4 mr-4">
                                                <label className="block text-sm font-medium mb-1">
                                                    Take Profit Levels
                                                </label>
                                                {fields.map((profitTakerField, index: number) => {
                                                        return (
                                                            <div key={profitTakerField.id} className="mb-4">
                                                                <div className="flex">
                                                                    {Object.entries(profitTakerField).map(([key, value]) => (
                                                                        <Controller
                                                                            key={key}
                                                                            name={`takeProfitLevels.${index}.${key as keyof TakeProfitLevel}`}
                                                                            control={control}
                                                                            render={({field}) => (
                                                                                chooseInputToRender(item, field)
                                                                            )}
                                                                        />
                                                                    ))}
                                                                    <Button type="button" variant="outline" className="ml-2"
                                                                            onClick={() => remove(index)}>
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                                {/*{renderErrorMessages(index)}*/}
                                                            </div>
                                                        )
                                                    }
                                                )}
                                                <Button type="button" variant="outline"
                                                        onClick={() => append({price: 0, quantity: 0})}>
                                                    Add Take Profit Level
                                                </Button>
                                            </div>
                                        )
                                    ))}
                                </div>
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
                        </form>
                    </CustomDialogContent>
                </CustomDialog>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Scenarios;
