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

interface StateAverageTimeChartProps {
  data: Record<string, string>; // state -> HH:MM
  title: string;
  description: string;
  isLoading?: boolean;
}

// Helper to convert HH:MM to decimal hours
function hhmmToHours(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h + m / 60;
}

export function StateAverageTimeChart({
  data,
  title,
  description,
  isLoading = false,
}: StateAverageTimeChartProps) {
  const chartData = Object.entries(data).map(([state, time]) => ({
    state,
    hour: hhmmToHours(time),
    label: time,
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
                domain={[0, 24]}
                label={{
                  value: 'Hour of Day',
                  angle: -90,
                  position: 'insideLeft',
                }}
                ticks={[0, 4, 8, 12, 16, 20, 24]}
              />
              <Tooltip
                formatter={(_value: number, _name: string, props: any) => {
                  // Show HH:MM in tooltip
                  return [props.payload.label, 'Average Time'];
                }}
              />
              <Legend />
              <Bar dataKey='hour' fill='#8884d8' name='Average Hour' />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
