import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {DailyTradeLimitSchema} from "@/schemas/types";

export const dailyTradeLimitApi = createApi({
    reducerPath: '',
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
    }),
})

export const {useSearchDailyTradeLimitQuery, useCreateDailyTradeLimitMutation} = dailyTradeLimitApi;