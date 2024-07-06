import {TradeSchema} from "@/schemas/types";

export interface TradeState {
    trades: TradeSchema[];
    setTrades: (trades: TradeSchema[]) => void;
    addTrade: (order: TradeSchema) => void;
}