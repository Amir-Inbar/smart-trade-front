import * as yup from 'yup';
import {StrategyType, Ticker} from "@/schemas/types";


export type TakeProfitLevel = {
    price: number;
    quantity: number;
};

export type BracketOrderSchemaFormValues = {
    ticker: string;
    strategy: string;
    enterPrice: number;
    stopPrice: number;
    takeProfitLevels: {
        price: number;
        quantity: number;
    }[];
    description: string;
    constructQuantity: number;
};

export type InputItemOptions = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type InputItem = {
    name: keyof BracketOrderSchemaFormValues;
    label: string;
    placeholder?: string;
    required: boolean;
    type?: 'text' | 'number' | 'select' | 'array';
    default?: string | number;
    options?: InputItemOptions[];
};


export const BracketOrderSchema = yup.object().shape({
    ticker: yup.string().required('Please select a ticker').default(Ticker.MES),
    strategy: yup.string().required('Please select a strategy').default(StrategyType.FALSE_BREAKOUT),
    enterPrice: yup.number().required('Please enter the entry price').positive(),
    stopPrice: yup.number().required('Please enter the stop price').positive(),
    takeProfitLevels: yup.array().of(
        yup.object().shape({
            price: yup.number().required('Please enter the price').positive(),
            quantity: yup.number().required('Please enter the quantity').positive(),
        })
    ).required('Please enter the take profit levels'),
    description: yup.string().required('Please describe why you chose the break point level'),
    constructQuantity: yup.number().required('Please enter the construct quantity').positive(), // Add this line
});

export const BracketOrderSchemaInputData: InputItem[] = [
    {
        name: 'ticker',
        label: 'Ticker',
        placeholder: 'Enter the ticker',
        required: true,
        type: 'select',
        default: Ticker.MES,
        options: [
            { value: Ticker.MES, label: 'MES' },
            { value: Ticker.MNQ, label: 'MNQ', disabled: true },
            { value: Ticker.M2K, label: 'M2K', disabled: true },
        ],
    },
    {
        name: 'strategy',
        label: 'Select Strategy',
        placeholder: 'Select your strategy',
        required: true,
        type: 'select',
        default: StrategyType.FALSE_BREAKOUT,
        options: [
            { value: StrategyType.FALSE_BREAKOUT, label: 'False Breakout' },
        ],
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
        name: 'takeProfitLevels',
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
