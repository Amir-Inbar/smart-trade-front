import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {scenarioApi} from "./api/scenarioApi";
import {contractApi} from "./api/contractApi";
import {tradeApi} from "./api/tradeApi";
import {dailyTradeEventsApi} from "@/store/api/dailyTradeEventsApi";
import {statisticsApi} from "@/store/api/statisticsApi";

const rootReducer = combineReducers({
    [scenarioApi.reducerPath]: scenarioApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [tradeApi.reducerPath]: tradeApi.reducer,
    [dailyTradeEventsApi.reducerPath]: dailyTradeEventsApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            scenarioApi.middleware,
            contractApi.middleware,
            tradeApi.middleware,
            dailyTradeEventsApi.middleware,
            statisticsApi.middleware
        )
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
