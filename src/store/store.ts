import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {scenarioApi} from "./api/scenarioApi";
import {contractApi} from "./api/contractApi";
import {accountApi} from "./api/accountApi";
import {tradeApi} from "./api/tradeApi";
import {dailyTradeEventsApi} from "@/store/api/dailyTradeEventsApi";

const rootReducer = combineReducers({
    [scenarioApi.reducerPath]: scenarioApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
    [tradeApi.reducerPath]: tradeApi.reducer,
    [dailyTradeEventsApi.reducerPath]: dailyTradeEventsApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            scenarioApi.middleware,
            accountApi.middleware,
            contractApi.middleware,
            tradeApi.middleware,
            dailyTradeEventsApi.middleware,
        )
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
