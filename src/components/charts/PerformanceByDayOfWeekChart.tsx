import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface PerformanceByDayOfWeekData {
  day: string; // e.g., 'Monday'
  completed_count: number;
  canceled_count: number;
}

interface PerformanceByDayOfWeekChartProps {
  data: PerformanceByDayOfWeekData[] | undefined;
  isLoading: boolean;
}

const DAY_NAME_MAP: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const DAY_ORDER: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const STATUS_COLORS: Record<string, string> = {
  completed_count: '#4CAF50', // Green
  canceled_count: '#F44336', // Red
};

export function PerformanceByDayOfWeekChart({
  data,
  isLoading,
}: PerformanceByDayOfWeekChartProps) {
  // Normalize input data to use short day labels
  const normalizedData =
    data?.map((d) => ({
      day: DAY_NAME_MAP[d.day] || d.day,
      completed_count: d.completed_count,
      canceled_count: d.canceled_count,
    })) || [];

  // Build chart data with all days ensured
  const chartData = DAY_ORDER.map((day) => {
    const dayData = normalizedData.find((d) => d.day === day);
    return {
      day,
      completed_count: dayData?.completed_count || 0,
      canceled_count: dayData?.canceled_count || 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance by Day of Week</CardTitle>
        <CardDescription>
          Number of scenarios by status per weekday
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[300px]'>
        {isLoading ? (
          <Skeleton className='h-64 w-full' />
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='day'
                angle={-15}
                textAnchor='end'
                interval={0}
                label={{
                  value: 'Day of Week',
                  position: 'insideBottom',
                  offset: -40,
                }}
              />
              <YAxis
                type='number'
                allowDecimals={false}
                label={{
                  value: 'Number of Scenarios',
                  angle: -90,
                  position: 'outsideLeft',
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value}`,
                  name
                    .replace('_count', '')
                    .replace('completed', 'Completed')
                    .replace('canceled', 'Canceled'),
                ]}
              />
              <Legend
                formatter={(value: string) =>
                  value
                    .replace('_count', '')
                    .replace('completed', 'Completed')
                    .replace('canceled', 'Canceled')
                }
              />
              <Bar
                dataKey='completed_count'
                stackId='a'
                fill={STATUS_COLORS.completed_count}
                name='Completed'
              />
              <Bar
                dataKey='canceled_count'
                stackId='a'
                fill={STATUS_COLORS.canceled_count}
                name='Canceled'
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
