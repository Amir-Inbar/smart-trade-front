import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StateDistributionData {
  name: string;
  value: number;
  color: string;
}

interface StateDistributionFunnelChartProps {
  data: Record<string, number> | undefined;
  title: string;
  description: string;
  isLoading?: boolean;
}

const STATE_ORDER = [
  'INITIAL',
  'BREAKOUT OCCURRED',
  'MINIMUM BREAKOUT POINTS ACHIEVED',
  'PRICE RETURNED TO SIGNIFICANT LEVEL',
  'FIRST 15 MIN CANDLE CLOSED',
  'TWO 5 MIN CANDLES CLOSED',
];

const STATE_COLORS: Record<string, string> = {
  INITIAL: '#3B82F6',
  'BREAKOUT OCCURRED': '#F59E0B',
  'MINIMUM BREAKOUT POINTS ACHIEVED': '#EF4444',
  'PRICE RETURNED TO SIGNIFICANT LEVEL': '#06B6D4',
  'FIRST 15 MIN CANDLE CLOSED': '#22C55E',
  'TWO 5 MIN CANDLES CLOSED': '#FACC15',
};

function formatXAxisLabel(label: string) {
  return label
    .replace('MINIMUM BREAKOUT POINTS ACHIEVED', 'MIN BREAKOUT')
    .replace('PRICE RETURNED TO SIGNIFICANT LEVEL', 'PRICE RETURNED')
    .replace('FIRST 15 MIN CANDLE CLOSED', '15-MIN CLOSED')
    .replace('TWO 5 MIN CANDLES CLOSED', '2×5-MIN CLOSED')
    .replace('BREAKOUT OCCURRED', 'BREAKOUT')
    .replace('INITIAL', 'INITIAL')
    .toLowerCase();
}

const formatStateName = (name: string): string => {
  return name;
};

export function StateDistributionFunnelChart({
  data,
  title,
  description,
  isLoading = false,
}: StateDistributionFunnelChartProps) {
  const chartData: StateDistributionData[] = STATE_ORDER.map((state) => ({
    name: formatStateName(state),
    value: data?.[state.toLowerCase().replace(/\s+/g, '_')] || 0,
    color: STATE_COLORS[state] || '#ccc',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        {isLoading ? (
          <Skeleton className='h-64 w-full' />
        ) : (
          <ResponsiveContainer width='100%' height={400}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='name'
                tickFormatter={formatXAxisLabel}
                angle={-30}
                textAnchor='end'
                interval={0}
                height={60}
              />
              <YAxis
                type='number'
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                allowDecimals={false} // Ensure only whole numbers for count
              />
              <Tooltip
                formatter={(value: number, name: string, props) => [
                  `${value}`,
                  props.payload.name.toLowerCase(),
                ]}
              />{' '}
              <Bar dataKey='value' name='Number of Scenarios' barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
