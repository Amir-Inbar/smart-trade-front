import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

interface StateTransitionsCountChartProps {
  data: Record<string, number>;
  title: string;
  description: string;
  isLoading?: boolean;
}

export function StateTransitionsCountChart({
  data,
  title,
  description,
  isLoading = false,
}: StateTransitionsCountChartProps) {
  const chartData = Object.entries(data).map(([transition, count]) => ({
    transition,
    count,
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
                dataKey='transition'
                label={{
                  value: 'Transition',
                  position: 'insideBottom',
                  offset: -5,
                }}
                angle={30}
                textAnchor='start'
                interval={0}
                height={80}
              />
              <YAxis
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip formatter={(value: number) => [value, 'Count']} />
              <Bar dataKey='count' fill='#8884d8' name='Count' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
