import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {TradeSchema} from "@/schemas/types";

export const tradesApi = createApi({
    reducerPath: 'tradesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['trades'],
    endpoints: (builder) => ({
        fetchTrades: builder.query<TradeSchema[], void>({
            query: () => 'trades/',
            providesTags: ['trades'],
        }),
    }),
})

export const {useFetchTradesQuery} = tradesApi;
