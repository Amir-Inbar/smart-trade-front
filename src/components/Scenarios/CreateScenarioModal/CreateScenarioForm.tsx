import React, {ReactElement, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {
    useForm,
    SubmitHandler,
    Controller,
    useFieldArray
} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    bracketOrderSchemaInputData,
    InputItem,
    ScenarioSchemaCreate,
    TakeProfitLevel
} from "@/components/Scenarios/Scenarios.util";
import {useCreateScenarioMutation} from "@/store/api/scenarioApi";
import {TradeSelect} from "@/components/TradeUi/TradeSelect";
import {TradeCheckbox} from "@/components/TradeUi/TradeCheckbox";
import {TradeInput} from "@/components/TradeUi/TradeInput";
import {DialogForm} from "../../DialogWrapper/DialogForm";
import {TradeInputWrapper} from "@/components/TradeUi/TradeInputWrapper";
import {
    ContractSchema, ScenarioSchema,
    ScenarioSchemaCreateSchema,
    StopPriceModeChoices
} from "@/schemas/types";
import {Textarea} from "@/components/ui/textarea";
import {TradeDatePicker} from "@/components/TradeUi/TradeDatePicker";

interface CreateScenarioFormProps {
    contracts: ContractSchema[];

    onCloseCreateScenarioModal(): void;

    onAddScenario(scenario: ScenarioSchema): void;
}

const CreateScenarioForm: React.FC<CreateScenarioFormProps> = (
    {
        contracts,
        onCloseCreateScenarioModal,
        onAddScenario
    }: CreateScenarioFormProps) => {
    const [createScenario] = useCreateScenarioMutation();

    const form = useForm<ScenarioSchemaCreateSchema>({
        resolver: yupResolver(ScenarioSchemaCreate)
    });

    const {
        watch,
        control,
        reset: resetCreateScenario,
        setError,
        formState: {errors}
    } = form;

    const stopPrice = watch("stop_price");

    const {fields, append, remove} = useFieldArray({
        control,
        name: "take_profit_levels"
    });

    useEffect(() => {
        const mode = stopPrice
            ? StopPriceModeChoices.MANUAL
            : StopPriceModeChoices.AUTOMATIC;
        form.setValue("stop_price_mode", mode);
    }, [stopPrice, form]);

    const onSubmit: SubmitHandler<ScenarioSchemaCreateSchema> = async (data) => {
        try {
            const scenario = await createScenario(data).unwrap();
            onAddScenario(scenario);
            onCloseCreateScenarioModal();
        } catch (error) {
            setError("root", {
                type: "manual",
                message: "Scenario creation failed."
            });
        }
    };

    const chooseInputToRender = (item: InputItem, field: any) => {
        if (!item.type) {
            return <div/>;
        }

        const componentMap: Record<
            string,
            (field: any, item: InputItem) => ReactElement
        > = {
            textarea: (field, item) => (
                <Textarea
                    className="ml-1 w-full resize-none rounded-md border p-2"
                    {...field}
                    placeholder={item.placeholder}
                />
            ),
            select: (field, item) => <TradeSelect field={field} item={item}/>,
            checkbox: (field, item) => <TradeCheckbox field={field} item={item}/>,
            date: (field, item) => <TradeDatePicker field={field} item={item}/>,
            default: (field, item) => (
                <TradeInput
                    item={item}
                    field={field}
                    type={item.type === "array" ? "number" : item.type}
                />
            )
        };

        const renderComponent = componentMap[item.type] || componentMap.default;

        return renderComponent(field, item);
    };

    const renderErrorMessages = (index: number) => {
        const errorFields = ["price", "quantity"];
        return errorFields.map((field) => {
            if (!errors.take_profit_levels) {
                return null;
            }

            const takeProfitLevel = errors.take_profit_levels[index];
            if (!takeProfitLevel) {
                return null;
            }

            const takeProfitLevelLine =
                takeProfitLevel[field as keyof TakeProfitLevel];

            return takeProfitLevelLine ? (
                <span key={field} className="mt-1 block text-sm text-red-500">
          {takeProfitLevelLine.message}
        </span>
            ) : null;
        });
    };

    const onCloseCreateScenario = () => {
        resetCreateScenario();
    };

    const ProfitTakerLevels = ({item}: { item: InputItem }) => (
        <div className="mb-4 mr-4">
            {fields.map((profitTakerField, index: number) => {
                const take_profit_levels = Object.entries(profitTakerField).filter(
                    ([key]) => key !== "id"
                );
                return (
                    <div key={profitTakerField.id} className="mb-4">
                        <div className="flex items-center">
                            {take_profit_levels.map(([key]) => (
                                <div key={key} className="flex flex-col px-1">
                                    <label
                                        className="mb-1 block text-sm font-medium"
                                        htmlFor={key}
                                    >
                                        {key}
                                    </label>
                                    <Controller
                                        key={key}
                                        name={`take_profit_levels.${index}.${
                                            key as keyof TakeProfitLevel
                                        }`}
                                        control={control}
                                        render={({field}) => chooseInputToRender(item, field)}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-5 p-2"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </Button>
                        </div>
                        {renderErrorMessages(index)}
                    </div>
                );
            })}
            <Button
                type="button"
                variant="outline"
                onClick={() => append({price: 0, quantity: 0})}
            >
                Add Take Profit Level
            </Button>
        </div>
    );

    return (
        <DialogForm<ScenarioSchemaCreateSchema>
            onSubmit={onSubmit}
            form={form}
            onClose={onCloseCreateScenario}
            submitText="Submit"
        >
            <div className="h-[600px] overflow-y-auto">
                {bracketOrderSchemaInputData(contracts).map((item) =>
                    item.name === "take_profit_levels" ? (
                        <ProfitTakerLevels key={item.name} item={item}/>
                    ) : (
                        <TradeInputWrapper
                            key={item.name}
                            item={item}
                            control={control}
                            render={chooseInputToRender}
                        />
                    )
                )}
                {errors.root && <div>{errors.root.message}</div>}
            </div>
        </DialogForm>
    );
};

export default CreateScenarioForm;
