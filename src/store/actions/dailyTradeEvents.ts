import {create} from "zustand";
import {DailyTradeEventsState} from "@/store/@types/dailyTradeEvents";
import {DailyTradeEventsSchema} from "@/schemas/types";


const useDailyTradeEventsStore = create<DailyTradeEventsState>((set) => ({
        dailyTradeEvents: [],

        setDailyTradeEvents: (dailyTradeEvents: DailyTradeEventsSchema[]) => set({dailyTradeEvents}),

        addDailyTradeEvent: (dailyTradeEvent: DailyTradeEventsSchema) => set((state) => ({
            dailyTradeEvents: [...state.dailyTradeEvents, dailyTradeEvent]
        }))
    })
);

export default useDailyTradeEventsStore;