import {DailyTradeLimitSchema} from "@/schemas/types";

export interface DailyTradeLimitState {
    dailyTradeLimits: DailyTradeLimitSchema[];

    setDailyTradeLimits: (dailyTradeLimits: DailyTradeLimitSchema[]) => void;

    addDailyTradeLimit: (dailyTradeLimit: DailyTradeLimitSchema) => void;
}
