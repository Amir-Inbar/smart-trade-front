import { StatsCard } from '@/components/charts/StatsCard';
import { StateDurationChart } from '@/components/charts/StateDurationChart';
import { StateOccurrencesByHourChart } from '@/components/charts/StateOccurrencesByHourChart';
import { StateDistributionFunnelChart } from '@/components/charts/StateDistributionFunnelChart';
import { PerformanceByDayOfWeekChart } from '@/components/charts/PerformanceByDayOfWeekChart';
import { StateLegend } from '@/components/charts/StateLegend';
import { TradeExecutionTimeHeatmapChart } from '@/components/charts/TradeExecutionTimeHeatmapChart';
import {
  useGetTotalStatisticsQuery,
  useGetOperationalStateDistributionQuery,
  useGetStateDurationsQuery,
  useGetStateTimesQuery,
  useGetPerformanceByDayOfWeekQuery,
  useGetTradeExecutionTimestampsQuery,
} from '@/store/api/statisticsApi';

const DashboardPage = () => {
  const { data: totalStatistics, isLoading: isLoadingTotal } =
    useGetTotalStatisticsQuery();
  const {
    data: operationalStateDistribution,
    isLoading: isLoadingOperational,
  } = useGetOperationalStateDistributionQuery();
  const { data: stateDurations, isLoading: isLoadingStateDurations } =
    useGetStateDurationsQuery();
  const { data: stateTimes, isLoading: isLoadingStateTimes } =
    useGetStateTimesQuery();
  const {
    data: performanceByDayOfWeekData,
    isLoading: isLoadingPerformanceByDayOfWeek,
  } = useGetPerformanceByDayOfWeekQuery();

  const {
    data: tradeExecutionTimestamps,
    isLoading: isLoadingTradeExecutionTimestamps,
  } = useGetTradeExecutionTimestampsQuery();

  return (
    <div className='p-4 space-y-6 flex flex-col'>
      <h1 className='mb-6 text-2xl font-bold'>Dashboard</h1>
      <StatsCard
        title='Total Statistics'
        description='Overview of scenario statistics'
        stats={[
          {
            label: 'Total Scenarios',
            value: totalStatistics?.total_scenarios || 0,
          },
          {
            label: 'Completed',
            value: totalStatistics?.completed_scenarios || 0,
          },
          {
            label: 'Completion Rate',
            value: totalStatistics?.completion_rate.toFixed(1) || 0,
            suffix: '%',
          },
        ]}
        isLoading={isLoadingTotal}
      />
      <StateLegend />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-[400px] p-0 m-0'>
        <StateDistributionFunnelChart
          title='Scenario Drop-off Funnel'
          description='Count of scenarios in each operational state (simulated funnel)'
          data={operationalStateDistribution || {}}
          isLoading={isLoadingOperational}
        />
        <StateDurationChart
          title='State Durations'
          description='Average duration for each state'
          data={stateDurations || {}}
          isLoading={isLoadingStateDurations}
        />
        <StateOccurrencesByHourChart
          title='State Occurrences by Hour'
          description='How often each scenario state occurs at each hour of the day'
          data={stateTimes || []}
          isLoading={isLoadingStateTimes}
        />
        <PerformanceByDayOfWeekChart
          data={performanceByDayOfWeekData}
          isLoading={isLoadingPerformanceByDayOfWeek}
        />
        <TradeExecutionTimeHeatmapChart
          title='Trade Execution Time Distribution'
          description='Heatmap showing the distribution of trade execution times by hour'
          data={tradeExecutionTimestamps}
          isLoading={isLoadingTradeExecutionTimestamps}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
