import {
    ContractSchema,
    ProgressStateSchema,
    ScenarioSchemaCreateSchema,
    StopPriceModeChoices,
    StrategyTypeEnum
} from "@/schemas/types";
import {array, boolean, number, object, string} from "yup";

export type TakeProfitLevel = {
    price: number;
    quantity: number;
};

export type InputItemOptions = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type InputItem = {
    name: keyof ScenarioSchemaCreateSchema;
    label: string;
    placeholder?: string;
    required: boolean;
    type?:
        | "text"
        | "number"
        | "select"
        | "array"
        | "checkbox"
        | "textarea"
        | "date";
    default?: string | number | boolean;
    options?: InputItemOptions[];
    note?: string;
};

const TakeProfitLevelCreateSchema = object({
    price: number().required("Price is required").positive("Price must be positive"),
    quantity: number().required("Quantity is required").positive("Quantity must be positive")
});


export const ScenarioSchemaCreate = object().shape({
    contract_id: string().required("Contract Name is required"),
    date_trade: string().optional(),
    action: string().required("Action is required"),
    strategy: string().required("Select Strategy is required"),
    break_down_price: number().required("Break down price is required"),
    stop_price: number()
        .positive("Stop price must be positive")
        .required("Stop price is required")
        .default(0),
    stop_price_mode: string().required("Stop price mode is required"),
    description: string().optional(),
    is_quality_scenario: boolean()
        .required("Quality Scenario flag is required")
        .default(false),
    take_profit_levels: array()
        .of(TakeProfitLevelCreateSchema)
        .required("Take Profit Levels are required")
        .default([]),
});


export const bracketOrderSchemaInputData = (contracts: ContractSchema[]): InputItem[] => [
    {
        name: "contract_id",
        label: "Ticker",
        placeholder: "Enter the ticker",
        required: true,
        type: "select",
        default: contracts[0]?.id || "",
        options: contracts.map((contract) => ({
            value: contract.id,
            label: contract.name || ""
        }))
    },
    {
        name: "date_trade",
        label: "Date Trade",
        placeholder: "Select the trade date",
        required: true,
        type: "date",
        note: "The date of the trade"
    },
    {
        name: "action",
        label: "Action",
        placeholder: "Select your action",
        required: true,
        type: "select",
        default: "BUY",
        options: [
            {value: "BUY", label: "BUY"},
            {value: "SELL", label: "SELL"}
        ]
    },
    {
        name: "strategy",
        label: "Select Strategy",
        placeholder: "Select your strategy",
        required: true,
        type: "select",
        default: StrategyTypeEnum.FALSE_BREAKOUT,
        options: [
            {value: StrategyTypeEnum.FALSE_BREAKOUT, label: "False Breakout"}
        ]
    },
    {
        name: "break_down_price",
        label: "Break Down Price",
        placeholder: "Enter the break down price",
        required: true,
        type: "number",
        default: 0
    },
    {
        name: "stop_price",
        label: "Stop Price",
        placeholder: "Enter the stop price",
        required: true,
        type: "number",
        default: 0,
        note: "If empty, the stop price will be 12 tick below the break down price"
    },
    {
        name: "stop_price_mode",
        label: "Stop Price Mode",
        placeholder: "Select the stop price mode",
        required: true,
        type: "select",
        default: StopPriceModeChoices.AUTOMATIC,
        options: [
            {value: StopPriceModeChoices.MANUAL, label: "Manual"},
            {value: StopPriceModeChoices.AUTOMATIC, label: "Automatic"}
        ]
    },
    {
        name: "take_profit_levels",
        label: "Take Profit Levels",
        placeholder: "Enter take profit levels",
        required: true,
        type: "array"
    },
    {
        name: "is_quality_scenario",
        label: "Quality Scenario",
        placeholder: "Is this a quality scenario?",
        required: false,
        type: "checkbox",
        default: false
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Describe why you chose the break point level",
        required: false,
        type: "textarea",
        default: ""
    }
];

export const recentScenarioProgressState = (progressStates: ProgressStateSchema[]): ProgressStateSchema => {
    return progressStates.reduce((latest, current) => new Date(current.time) > new Date(latest.time) ? current : latest);
};

