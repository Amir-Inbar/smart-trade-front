import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {DailyTradeLimitSchema} from "@/schemas/types";

export const dailyTradeLimitApi = createApi({
    reducerPath: 'dailyTradeLimitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['dailyTradeLimit'],
    endpoints: (builder) => ({
        searchDailyTradeLimit: builder.query<DailyTradeLimitSchema[], void>({
            query: () => 'daily-trade-limit',
            providesTags: ['dailyTradeLimit']
        }),
        createDailyTradeLimit: builder.mutation<DailyTradeLimitSchema, DailyTradeLimitSchema>({
            query: (body) => ({
                url: 'daily-trade-limit',
                method: 'POST',
                body
            }),
            invalidatesTags: ['dailyTradeLimit']
        }),
        updateDailyTradeLimit: builder.mutation<DailyTradeLimitSchema, DailyTradeLimitSchema>({
            query: (body) => ({
                url: `daily-trade-limit/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['dailyTradeLimit']
        }),
        deleteDailyTradeLimit: builder.mutation<void, number>({
            query: (id) => ({
                url: `daily-trade-limit/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['dailyTradeLimit']
        }),
    }),
});

export const {
    useSearchDailyTradeLimitQuery,
    useCreateDailyTradeLimitMutation,
    useUpdateDailyTradeLimitMutation,
    useDeleteDailyTradeLimitMutation,
} = dailyTradeLimitApi;


