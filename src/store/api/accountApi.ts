import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AccountValueSchema} from "@/schemas/types";
import {API_HOST} from "@/config/consts";

export const accountApi = createApi({
    reducerPath: 'account',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['account'],
    endpoints: (builder) => ({
        fetchAccountSummary: builder.query<AccountValueSchema[][], void>({
            query: () => 'account/summary',
            providesTags: ['account'],
        }),
        fetchAccountNumber: builder.query<any, void>({
            query: () => 'account/number',
            providesTags: ['account'],
        }),
    }),
})

export const {useFetchAccountSummaryQuery, useFetchAccountNumberQuery} = accountApi;