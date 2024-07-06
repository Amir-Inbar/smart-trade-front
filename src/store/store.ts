import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {tradesApi} from './api/tradeApi';
import {accountApi} from "@/store/api/accountApi";

const rootReducer = combineReducers({
    [tradesApi.reducerPath]: tradesApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            tradesApi.middleware,
            accountApi.middleware
        ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
