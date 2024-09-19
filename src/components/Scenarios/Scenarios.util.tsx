import * as yup from 'yup';
import {ScenarioSchemaCreateSchema, StrategyType, Ticker} from "@/schemas/types";

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
    type?: 'text' | 'number' | 'select' | 'array' | 'checkbox';
    default?: string | number;
    options?: InputItemOptions[];
};

export const ScenarioSchemaCreate = yup.object().shape({
    id: yup.string().optional(),
    contractId: yup.string().optional(),
    action: yup.string().required('Action is required'),
    selectStrategy: yup.string().required('Select strategy is required'),
    breakDownPrice: yup.number().optional(),
    enterPrice: yup.number().optional(),
    stopPrice: yup.number().optional(),
    stopPriceMode: yup.string().optional(),
    description: yup.string().optional(),
    isQualityScenario: yup.boolean().optional(),
    takeProfitLevels: yup.array().of(
        yup.object().shape({
            price: yup.number().required('Price is required').positive('Price must be positive'),
            quantity: yup.number().required('Quantity is required').positive('Quantity must be positive'),
        })
    ).optional(),
});

export const BracketOrderSchemaInputData: InputItem[] = [
    {
        name: 'contractId',
        label: 'Ticker',
        placeholder: 'Enter the ticker',
        required: true,
        type: 'select',
        default: Ticker.MES,
        options: [
            {value: 'MES', label: 'MES'},
            {value: 'MNQ', label: 'MNQ', disabled: true},
            {value: 'M2K', label: 'M2K', disabled: true},
        ],
    },
    {
        name: 'action',
        label: 'Action',
        placeholder: 'Select your action',
        required: true,
        type: 'select',
        default: 'BUY',
        options: [
            {value: 'BUY', label: 'BUY'},
            {value: 'SELL', label: 'SELL'},
        ],
    },
    {
        name: 'selectStrategy',
        label: 'Select Strategy',
        placeholder: 'Select your strategy',
        required: true,
        type: 'select',
        default: StrategyType.FALSE_BREAKOUT,
        options: [
            {value: StrategyType.FALSE_BREAKOUT, label: 'False Breakout'},
        ],
    }, {
        name: 'breakDownPrice',
        label: 'Break Down Price',
        placeholder: 'Enter the break down price',
        required: true,
        type: 'number',
        default: 0,
    },
    {
        name: 'enterPrice',
        label: 'Enter Price',
        placeholder: 'Enter the price',
        required: true,
        type: 'number',
        default: 0,
    },
    {
        name: 'stopPrice',
        label: 'Stop Price',
        placeholder: 'Enter the stop price',
        required: true,
        type: 'number',
        default: 0,
    },
    {
        name: 'stopPriceMode',
        label: 'Take Profit Levels',
        placeholder: 'Enter take profit levels',
        required: true,
        type: 'array',
    },
    {
        name: 'description',
        label: 'Description',
        placeholder: 'Describe why you chose the break point level',
        required: true,
        type: 'text',
        default: '',
    },
];
