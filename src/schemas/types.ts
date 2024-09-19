'use client'
import {components} from "@/schemas/openapi"


export type OrderSchema = components["schemas"]["OrderSchema"]
export type ScenarioSchema = components["schemas"]["ScenarioSchema"]
export type TakeProfitLevelSchema = components["schemas"]["TakeProfitLevelSchema"]
// export type ScenarioSchemaCreateSchema = components["schemas"]["ScenarioSchemaCreate"]

export interface AccountValueSchema {
    account: string;
    AccountType: string;
    Cushion: string;
    DayTradesRemaining: string;
    AccruedCash: string;
    AvailableFunds: string;
}

export enum StrategyType {
    FALSE_BREAKOUT = "FALSE_BREAKOUT",
}

export enum Ticker {
    MES = "MES",
    MNQ = "MNQ",
    M2K = "M2K"
}
export interface ScenarioSchemaCreateSchema {
    id?: string;
    contractId?: string;
    action: string;
    selectStrategy: string;
    breakDownPrice?: number;
    enterPrice?: number;
    stopPrice?: number;
    stopPriceMode?: string;
    description?: string;
    isQualityScenario?: boolean;
    takeProfitLevels?: {
        price: number;
        quantity: number;
    }[];
}
