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

interface StateOccurrencesByHour {
  hour: number;
  [state: string]: number;
}

interface StateOccurrencesByHourChartProps {
  data: StateOccurrencesByHour[];
  title: string;
  description: string;
  isLoading?: boolean;
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#a83232',
  '#32a852',
  '#a832a8',
  '#326fa8',
  '#a87c32',
];

export function BreakoutSuccessRateByHourChart({
  data,
  title,
  description,
  isLoading = false,
}: StateOccurrencesByHourChartProps) {
  // Get all unique state names (excluding 'hour')
  const stateNames = data.length
    ? Object.keys(data[0]).filter((k) => k !== 'hour')
    : [];

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
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='hour'
                label={{
                  value: 'Hour of Day',
                  position: 'insideBottom',
                  offset: -5,
                }}
                interval={0}
                height={50}
                ticks={[...Array(24).keys()]}
              />
              <YAxis
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend />
              {stateNames.map((state, idx) => (
                <Bar
                  key={state}
                  dataKey={state}
                  stackId='a'
                  fill={COLORS[idx % COLORS.length]}
                  name={state.replace(/_/g, ' ')}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
