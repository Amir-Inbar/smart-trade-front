import {create} from "zustand";
import {DailyTradeLimitState} from "@/store/@types/dailyTradeLimit";
import {DailyTradeLimitSchema} from "@/schemas/types";


const useDailyTradeLimitStore = create<DailyTradeLimitState>((set) => ({
        dailyTradeLimits: [],

        setDailyTradeLimits: (dailyTradeLimits: DailyTradeLimitSchema[]) => set({dailyTradeLimits}),

        addDailyTradeLimit: (dailyTradeLimit: DailyTradeLimitSchema) => set((state) => ({
            dailyTradeLimits: [...state.dailyTradeLimits, dailyTradeLimit]
        }))
    })
);

export default useDailyTradeLimitStore;