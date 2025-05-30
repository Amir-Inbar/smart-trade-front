import {
  LineChart,
  Line,
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

interface TimeSeriesData {
  date: string;
  starts: number;
  completions: number;
}

interface LineChartComponentProps {
  data: Record<string, { starts: number; completions: number }>;
  title: string;
  description: string;
  isLoading?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// New line colors
const LINE_COLORS = {
  starts: '#e15759', // Example color
  completions: '#59a14f', // Example color
};

export function LineChartComponent({
  data,
  title,
  description,
  isLoading = false,
  xAxisLabel,
  yAxisLabel,
}: LineChartComponentProps) {
  const chartData = Object.entries(data).map(([date, values]) => ({
    date,
    starts: values.starts,
    completions: values.completions,
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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' label={xAxisLabel} />
              <YAxis label={yAxisLabel} />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='starts'
                stroke={LINE_COLORS.starts}
                name='Starts'
              />
              <Line
                type='monotone'
                dataKey='completions'
                stroke={LINE_COLORS.completions}
                name='Completions'
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
