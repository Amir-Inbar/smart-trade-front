import {FC, Fragment, ReactElement, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {
    useForm,
    SubmitHandler,
    Controller,
    useFieldArray,
} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    bracketOrderSchemaInputData,
    InputItem, ScenarioSchemaCreate,
} from "@/components/Scenarios/Scenarios.util";
import {useCreateScenarioMutation} from "@/store/api/scenarioApi";
import {TradeSelect} from "@/components/TradeUi/TradeSelect";
import {TradeCheckbox} from "@/components/TradeUi/TradeCheckbox";
import {TradeInput} from "@/components/TradeUi/TradeInput";
import {DialogForm} from "../../DialogWrapper/DialogForm";
import {TradeInputWrapper} from "@/components/TradeUi/TradeInputWrapper";
import {
    ContractSchema,
    ScenarioSchema,
    ScenarioSchemaCreateSchema,
    StopPriceModeChoices,
    StrategyTypeEnum,
    UsersSchema,
} from "@/schemas/types";
import {Textarea} from "@/components/ui/textarea";
import {TradeDatePicker} from "@/components/TradeUi/TradeDatePicker";

interface CreateScenarioFormProps {
    contracts: ContractSchema[];

    users: UsersSchema;

    onCloseCreateScenarioModal(): void;

    onAddScenario(scenario: ScenarioSchema): void;
}

const CreateScenarioForm: FC<CreateScenarioFormProps> = ({
                                                             contracts,
                                                             onCloseCreateScenarioModal,
                                                             onAddScenario,
                                                             users,
                                                         }: CreateScenarioFormProps) => {
    const [createScenario] = useCreateScenarioMutation();

    const form = useForm<ScenarioSchemaCreateSchema>({
        resolver: yupResolver(ScenarioSchemaCreate),
        defaultValues: {
            take_profit_prices: [],
        },
    });

    const {
        watch,
        control,
        reset: resetCreateScenario,
        setError,
        formState: {errors},
    } = form;

    const stopPrice = watch("stop_price");
    const date_trade = watch("date_trade");
    const selectedStrategy = watch("strategy");

    const {fields, append, remove} = useFieldArray<ScenarioSchemaCreateSchema, "take_profit_prices">({
        control: control,
        name: "take_profit_prices",
    });

    useEffect(() => {
        const mode = stopPrice ? StopPriceModeChoices.MANUAL : StopPriceModeChoices.AUTOMATIC;
        form.setValue("stop_price_mode", mode);
        form.setValue("date_trade", date_trade || new Date().toISOString().split("T")[0]);
    }, [stopPrice, form, date_trade]);

    const onSubmit: SubmitHandler<ScenarioSchemaCreateSchema> = async (data) => {
        try {
            // data already has take_profit_prices: number[]
            const scenario = await createScenario(data).unwrap();
            onAddScenario(scenario);
            onCloseCreateScenarioModal();
        } catch (error) {
            setError("root", {
                type: "manual",
                message: "Scenario creation failed.",
            });
        }
    };

    const chooseInputToRender = (item: InputItem, field: any): ReactElement => {
        if (!item.type) return <div/>;

        const componentMap: Record<string, (field: any, item: InputItem) => ReactElement> = {
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
                <TradeInput item={item} field={field} type={item.type === "array" ? "number" : item.type}/>
            ),
        };

        const renderComponent = componentMap[item.type] || componentMap.default;
        return renderComponent(field, item);
    };

    const renderPriceError = (index: number) => {
        const arrErr = errors.take_profit_prices as unknown as (string | { message?: string })[] | undefined;
        const entryErr = arrErr?.[index] as any;
        if (!entryErr) return null;
        const message = typeof entryErr === "string" ? entryErr : entryErr.message;
        return message ? (
            <span className="mt-1 block text-sm text-red-500">{message}</span>
        ) : null;
    };

    const onCloseCreateScenario = () => {
        resetCreateScenario();
    };

    const FastProtocolInfoPanel = () => (
        <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
            <p className="mb-2 font-semibold text-amber-800">Fast Protocol Rules</p>
            <ul className="space-y-1 text-amber-700">
                <li><span className="font-medium">Entry:</span> Level + 6 points (limit order)</li>
                <li><span className="font-medium">Stop Loss:</span> Level − 10 points</li>
                <li><span className="font-medium">Profit Target:</span> TP2 of your scenario (second Take Profit Price)</li>
                <li><span className="font-medium">Confirmation:</span> 5-min candle close above level, then 2 consecutive 1-min candles closing ≥ 5 pts above level</li>
            </ul>
        </div>
    );

    const ProfitTakerPrices = ({item}: { item: InputItem }) => (
        <div className="mb-4 mr-4">
            {fields.map((f, index) => (
                <div key={f.id} className="mb-4">
                    <div className="flex items-center">
                        <div className="flex flex-col px-1">
                            <label className="mb-1 block text-sm font-medium" htmlFor={`take_profit_prices.${index}`}>
                                Price #{index + 1}
                            </label>
                            <Controller
                                name={`take_profit_prices.${index}`}
                                control={control}
                                render={({field}) =>
                                    chooseInputToRender(
                                        {...item, type: "number", placeholder: "Enter take-profit price"},
                                        {
                                            ...field,
                                            // ensure numbers
                                            onChange: (e: any) => {
                                                const v = e?.target?.value ?? e;
                                                const num = v === "" || v === null ? null : Number(v);
                                                field.onChange(Number.isFinite(num) ? num : undefined);
                                            },
                                        }
                                    )
                                }
                            />
                        </div>
                        <Button type="button" variant="outline" className="mt-5 p-2 ml-2" onClick={() => remove(index)}>
                            Remove
                        </Button>
                    </div>
                    {renderPriceError(index)}
                </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append(0)}>
                Add Take Profit Price
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
                {bracketOrderSchemaInputData(contracts).map((item) => {
                    if (item.name === "take_profit_prices") {
                        return <ProfitTakerPrices key={item.name} item={item}/>;
                    }
                    return (
                        <Fragment key={item.name}>
                            <TradeInputWrapper item={item} control={control} render={chooseInputToRender}/>
                            {item.name === "strategy" && selectedStrategy === StrategyTypeEnum.FAST_BREAKOUT && (
                                <FastProtocolInfoPanel/>
                            )}
                        </Fragment>
                    );
                })}
                {errors.root && <div className="text-red-500 mt-2">{String(errors.root.message)}</div>}
            </div>
        </DialogForm>
    );
};

export default CreateScenarioForm;
