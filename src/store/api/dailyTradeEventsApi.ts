import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {DailyTradeEventsCreateSchema, DailyTradeEventsSchema, DailyTradeEventsSearchSchema} from "@/schemas/types";

export const dailyTradeEventsApi = createApi({
    reducerPath: 'dailyTradeEventsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['dailyTradeEvents'],
    endpoints: (builder) => ({
        searchDailyTradeEvents: builder.mutation<DailyTradeEventsSchema[], DailyTradeEventsSearchSchema>({
            query: (body) => ({
                url: 'daily-trade-events/search',
                method: 'POST',
                body
            }),
            invalidatesTags: ['dailyTradeEvents']
        }),
        createDailyTradeEvents: builder.mutation<DailyTradeEventsSchema, DailyTradeEventsCreateSchema>({
            query: (body) => ({
                url: 'daily-trade-events/create',
                method: 'POST',
                body
            }),
            invalidatesTags: ['dailyTradeEvents']
        }),
        updateDailyTradeEvents: builder.mutation<DailyTradeEventsSchema, DailyTradeEventsSchema>({
            query: (body) => ({
                url: `daily-trade-events/${body.id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['dailyTradeEvents']
        }),
        deleteDailyTradeEvents: builder.mutation<void, string>({
            query: (id) => ({
                url: `daily-trade-events/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['dailyTradeEvents']
        }),
    }),
});

export const {
    useSearchDailyTradeEventsMutation,
    useCreateDailyTradeEventsMutation,
    useUpdateDailyTradeEventsMutation,
    useDeleteDailyTradeEventsMutation,
} = dailyTradeEventsApi;


