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
  day: string;
  completed_count: number;
  canceled_count: number;
  pending_count: number;
}

interface PerformanceByDayOfWeekChartProps {
  data: PerformanceByDayOfWeekData[] | undefined;
  isLoading: boolean;
}

// Define the desired order of days of the week
const DAY_ORDER: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Define colors for the stacked bars
const STATUS_COLORS: Record<string, string> = {
  completed_count: '#4CAF50', // Green
  canceled_count: '#F44336', // Red
};

export function PerformanceByDayOfWeekChart({
  data,
  isLoading,
}: PerformanceByDayOfWeekChartProps) {
  // Sort data according to DAY_ORDER and ensure all days are present (with 0 if no data)
  const chartData = DAY_ORDER.map((day) => {
    const dayData = data?.find((d) => d.day === day);
    return {
      day: day,
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
                  offset: -5,
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
