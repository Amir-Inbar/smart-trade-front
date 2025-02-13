import {create} from "zustand";
import {TradeState} from "../@types/trade.ts";

const useTradeStore = create<TradeState
>((set) => ({
    trades: [],
    setTrades: (trades) => set({trades}),
    addTrade: (trade) => set((state) => ({trades: [...state.trades, trade]}))
}));

export default useTradeStore