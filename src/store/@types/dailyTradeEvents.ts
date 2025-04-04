import {DailyTradeEventsSchema} from "@/schemas/types";

export interface DailyTradeEventsState {
    dailyTradeEvents: DailyTradeEventsSchema[];

    setDailyTradeEvents: (dailyTradeEvents: DailyTradeEventsSchema[]) => void;

    addDailyTradeEvent: (dailyTradeEvent: DailyTradeEventsSchema) => void;
}
