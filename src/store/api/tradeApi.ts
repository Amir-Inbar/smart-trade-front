import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {TradeSchema} from "@/schemas/types";
import {BracketOrderSchemaFormValues} from "@/components/Scenarios/Scenarios.util";

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
        createTrade: builder.mutation<TradeSchema, BracketOrderSchemaFormValues>({
            query: (body) => ({
                url: 'trades/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['trades'],
        }),
        updateTrade: builder.mutation<TradeSchema, TradeSchema>({
            query: (body) => ({
                url: `trades/${body.id}/`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['trades'],
        }),
    }),
});

export const {
    useFetchTradesQuery,
    useCreateTradeMutation,
    useUpdateTradeMutation
} = tradesApi;
