import {create} from 'zustand'
import {OrderState} from "@/store/@types/order";
import {OrderSchema, TradeSchema} from "@/schemas/types";
import {TradeState} from "@/store/@types/trade";


const useTradesStore = create<TradeState>((set) => ({
    trades: [],
    setTrades: (trades: TradeSchema[]) => set({trades}),
    addTrade: (order: TradeSchema) => set((state) => ({
        trades: [...state.trades, order],
    }))
}))

export default useTradesStore
