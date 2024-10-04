import * as yup from "yup";
import {
  ScenarioSchemaCreateSchema,
  StopPriceModeChoices,
  StrategyTypeEnum,
  Ticker
} from "@/schemas/types";

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
  type?: "text" | "number" | "select" | "array" | "checkbox";
  default?: string | number | boolean;
  options?: InputItemOptions[];
};

type SelectStrategy = "FALSE_BREAKOUT" | "TRUE_BREAKOUT";

export const ScenarioSchemaCreate = yup.object().shape({
  contract_name: yup.string().required("Contract Name is required"),
  action: yup.string().required("Action is required"),
  select_strategy: yup
    .mixed<"FALSE_BREAKOUT">()
    .oneOf(["FALSE_BREAKOUT"], "Invalid select strategy")
    .required("Select strategy is required"),
  break_down_price: yup
    .number()
    .required("Break down price is required")
    .positive("Break down price must be positive"),
  enter_price: yup
    .number()
    .required("Enter price is required")
    .positive("Enter price must be positive"),
  stop_price: yup
    .number()
    .required("Stop price is required")
    .positive("Stop price must be positive"),
  stop_price_mode: yup
    .mixed<"MANUAL" | "AUTOMATIC">()
    .oneOf(["MANUAL", "AUTOMATIC"], "Invalid stop price mode")
    .required("Stop price mode is required"),
  description: yup.string().required("Description is required"),
  is_quality_scenario: yup.boolean().optional().default(false),
  take_profit_levels: yup
    .array()
    .of(
      yup.object().shape({
        price: yup
          .number()
          .required("Price is required")
          .positive("Price must be positive"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .positive("Quantity must be positive")
      })
    )
    .optional()
});

export const BracketOrderSchemaInputData: InputItem[] = [
  {
    name: "contract_name",
    label: "Ticker",
    placeholder: "Enter the ticker",
    required: true,
    type: "select",
    default: Ticker.MES,
    options: [
      { value: "MES", label: "MES" },
      { value: "MNQ", label: "MNQ", disabled: true },
      { value: "M2K", label: "M2K", disabled: true }
    ]
  },
  {
    name: "action",
    label: "Action",
    placeholder: "Select your action",
    required: true,
    type: "select",
    default: "BUY",
    options: [
      { value: "BUY", label: "BUY" },
      { value: "SELL", label: "SELL" }
    ]
  },
  {
    name: "select_strategy",
    label: "Select Strategy",
    placeholder: "Select your strategy",
    required: true,
    type: "select",
    default: StrategyTypeEnum.FALSE_BREAKOUT,
    options: [
      { value: StrategyTypeEnum.FALSE_BREAKOUT, label: "False Breakout" }
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
    name: "enter_price",
    label: "Enter Price",
    placeholder: "Enter the price",
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
    default: 0
  },
  {
    name: "stop_price_mode",
    label: "Stop Price Mode",
    placeholder: "Select the stop price mode",
    required: true,
    type: "select",
    default: StopPriceModeChoices.MANUAL,
    options: [
      { value: StopPriceModeChoices.MANUAL, label: "Manual" },
      { value: StopPriceModeChoices.AUTOMATIC, label: "Automatic" }
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
    required: true,
    type: "text",
    default: false
  }
];
