import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StateDurationChartProps {
  data: Record<string, number>;
  title: string;
  description: string;
  isLoading?: boolean;
}

export function StateDurationChart({
  data,
  title,
  description,
  isLoading = false,
}: StateDurationChartProps) {
  const chartData = Object.entries(data).map(([state, duration]) => ({
    state,
    duration: Number(duration.toFixed(2)), // Round to 2 decimal places
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className='h-64' />
        ) : (
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='state'
                label={{ value: 'State', position: 'insideBottom', offset: -5 }}
                angle={30}
                textAnchor='start'
                interval={0}
                height={60}
              />
              <YAxis
                label={{
                  value: 'Duration (seconds)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} seconds`, 'Duration']}
              />
              <Legend />
              <Bar dataKey='duration' fill='#8884d8' name='Average Duration' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
