'use client'
import {components} from "@/schemas/openapi"


export type TradeSchema = components["schemas"]["TradeSchema"]
export type OrderSchema = components["schemas"]["OrderSchema"]
export type OrderStatusSchema = components["schemas"]["OrderStatusSchema"]
export type TradeLogEntrySchema = components["schemas"]["TradeLogEntrySchema"]



export interface AccountValueSchema {
    account: string;
    AccountType: string;
    Cushion: string;
    DayTradesRemaining: string;
    AccruedCash: string;
    AvailableFunds: string;
}
