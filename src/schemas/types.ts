import {components} from "./openapi";

export type OrderSchema = components["schemas"]["OrderSchema"];
export type ScenarioSchema = components["schemas"]["ScenarioSchema"];
export type ScenarioSchemaUpdateSchema =
    components["schemas"]["ScenarioSchemaUpdate"];
export type ScenarioSchemaCreateSchema =
    components["schemas"]["ScenarioSchemaCreate"];
export type ContractSchema = components["schemas"]["ContractSchema"];
export type ContractSchemaSearchSchema =
    components["schemas"]["ContractSchemaSearch"];
export type ScenarioSchemaSearch = components["schemas"]["ScenarioSchemaSearch"];
export type OperationalStateType = components["schemas"]["OperationalState"];
export type TradeSchema = components["schemas"]["TradeSchema"];
export type TradeSearchSchema = components["schemas"]["TradeSearchSchema"];
export type ProgressStateSchema = components["schemas"]["ProgressStateSchema"];
export type DailyTradeEventsSchema = components["schemas"]["DailyTradeEventsSchema"];
export type DailyTradeEventsCreateSchema = components["schemas"]["DailyTradeEventsCreateSchema"];
export type DailyTradeEventsSearchSchema = components["schemas"]["DailyTradeEventsSearchSchema"];
export type UserSchema = components["schemas"]["UserSchema"];
export type UserSearchSchema = components["schemas"]["UserSchemaSearch"];
export type UserTPLevelDefaultSchema = components["schemas"]["UserTPLevelDefaultSchema"];
export type UserTakeProfitLevelsDefaultSchemaUpdate = components["schemas"]["UserTakeProfitLevelsDefaultSchemaUpdate"];
export type UserTakeProfitLevelsDefaultSchemaSearch = components["schemas"]["UserTakeProfitLevelsDefaultSchemaSearch"];
export type UsersSchema = components["schemas"]["UserSchema"][];

export enum StrategyTypeEnum {
    FALSE_BREAKOUT = "FALSE_BREAKOUT",
}

export enum Ticker {
    MES = "MES",
    MNQ = "MNQ",
    M2K = "M2K",
}

export enum StopPriceModeChoices {
    AUTOMATIC = "AUTOMATIC",
    MANUAL = "MANUAL",
}

export enum ProgressState {
    INITIAL = "initial",
    BREAKOUT_OCCURRED = "breakout_occurred",
    MINIMUM_BREAKOUT_POINTS_ACHIEVED = "minimum_breakout_points_achieved",
    PRICE_RETURNED_TO_SIGNIFICANT_LEVEL = "price_returned_to_significant_level",
    FIRST_15_MIN_CANDLE_CLOSED = "first_15_min_candle_closed",
    TWO_5_MIN_CANDLES_CLOSED = "two_5_min_candles_closed"
}

export enum OperationalState {
    PENDING = "pending",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
    ERROR = "error",
    PAUSED = "paused"
}

export enum OrderStatusOptions {
    PENDING = "pending",
    FILLED = "filled",
    CANCELLED = "cancelled",
    ERROR = "error"
}

export enum DailyTradeEventType {
    DAILY_TRADE_LIMIT = "daily_trade_limit",
    EVENT_TRADE_LIMIT = "event_trade_limit",
}

export enum TradeResultsType {
    PROFIT = "profit",
    LOSS = "loss",
    CANCELLED = "cancelled",
}