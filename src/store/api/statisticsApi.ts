import {API_HOST} from '@/config/consts';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    TotalStatistics,
    DistributionStatistics,
    StateDurations,
} from '@/types/statistics';

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['statistics'],
    endpoints: (builder) => ({
        getTotalStatistics: builder.query<TotalStatistics, void>({
            query: () => 'statistics/total',
            providesTags: ['statistics'],
        }),
        getOperationalStateDistribution: builder.query<
            DistributionStatistics,
            void
        >({
            query: () => 'statistics/operational-state',
            providesTags: ['statistics'],
        }),
        getStateDurations: builder.query<StateDurations, void>({
            query: () => 'statistics/state-durations',
            providesTags: ['statistics'],
        }),
        getStateTimes: builder.query<any, void>({
            query: () => 'statistics/state-times',
            providesTags: ['statistics'],
        }),
    }),
});

export const {
    useGetTotalStatisticsQuery,
    useGetOperationalStateDistributionQuery,
    useGetStateDurationsQuery,
    useGetStateTimesQuery,
} = statisticsApi;
