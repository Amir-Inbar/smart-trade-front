import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { StatsCard } from '@/components/charts/StatsCard';
import { StateDurationChart } from '@/components/charts/StateDurationChart';
import { BreakoutSuccessRateByHourChart } from '@/components/charts/BreakoutSuccessRateByHourChart';
import {
  useGetTotalStatisticsQuery,
  useGetOperationalStateDistributionQuery,
  useGetStateDurationsQuery,
  useGetStateTimesQuery,
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

  const isLoading =
    isLoadingTotal ||
    isLoadingOperational ||
    isLoadingStateDurations ||
    isLoadingStateTimes

  return (
    <Container className='p-4 space-y-6 flex flex-col'>
      <Typography variant='h1' className='mb-6'>
        Dashboard
      </Typography>
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
        isLoading={isLoading}
      />
      <BarChartComponent
        title='Operational State Distribution'
        description='Current state of all scenarios'
        data={operationalStateDistribution || {}}
        isLoading={isLoading}
      />
      <StateDurationChart
        title='State Durations'
        description='Average duration for each state'
        data={stateDurations || {}}
        isLoading={isLoading}
      />
      <BreakoutSuccessRateByHourChart
        title='State Occurrences by Hour'
        description='How often each scenario state occurs at each hour of the day'
        data={stateTimes || []}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default DashboardPage;
