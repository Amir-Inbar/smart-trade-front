import { API_HOST } from '@/config/consts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TotalStatistics,
  DistributionStatistics,
  StateDurations,
} from '@/types/statistics';

// Define a type for the new performance by day of week data
interface PerformanceByDayOfWeekData {
  day: string; // e.g., "Monday", "Tuesday"
  completed_count: number;
  canceled_count: number;
  pending_count: number;
}

// Define the type for the trade execution timestamps
type TradeExecutionTimestamps = string[];

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
    getPerformanceByDayOfWeek: builder.query<
      PerformanceByDayOfWeekData[],
      void
    >({
      query: () => 'statistics/performance-by-day',
      providesTags: ['statistics'],
    }),
    getTradeExecutionTimestamps: builder.query<TradeExecutionTimestamps, void>({
      query: () => 'statistics/trade-execution-time',
      providesTags: ['statistics'],
    }),
  }),
});

export const {
  useGetTotalStatisticsQuery,
  useGetOperationalStateDistributionQuery,
  useGetStateDurationsQuery,
  useGetStateTimesQuery,
  useGetPerformanceByDayOfWeekQuery,
  useGetTradeExecutionTimestampsQuery,
} = statisticsApi;
