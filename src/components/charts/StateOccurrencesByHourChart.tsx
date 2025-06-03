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

const STATE_ORDER = [
  'INITIAL',
  'BREAKOUT_OCCURRED',
  'MINIMUM_BREAKOUT_POINTS_ACHIEVED',
  'PRICE_RETURNED_TO_SIGNIFICANT_LEVEL',
  'FIRST_15_MIN_CANDLE_CLOSED',
  'TWO_5_MIN_CANDLES_CLOSED',
];

const STATE_COLORS = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
];

function formatStateName(name: string): string {
  return name
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function StateOccurrencesByHourChart({
  data,
  title,
  description,
  isLoading = false,
}: StateOccurrencesByHourChartProps) {
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
                label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }}
                interval={0}
                height={50}
                ticks={[...Array(24).keys()]}
              />
              <YAxis
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend formatter={(value: string) => formatStateName(value)} />
              {STATE_ORDER.map((state, idx) => (
                <Bar
                  key={state}
                  dataKey={state.toLowerCase()}
                  stackId='a'
                  fill={STATE_COLORS[idx % STATE_COLORS.length]}
                  name={formatStateName(state)}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
