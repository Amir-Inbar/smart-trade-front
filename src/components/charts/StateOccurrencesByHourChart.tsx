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
  /**
   * Data for state occurrences by hour.
   * Expected format: Array of objects { hour: number, state1: count1, state2: count2, ... }
   */
  data: StateOccurrencesByHour[];
  title: string;
  description: string;
  isLoading?: boolean;
}

// Define the desired order of operational states for stacking bars
const STATE_ORDER = [
  'INITIAL',
  'BREAKOUT_OCCURRED',
  'MINIMUM_BREAKOUT_POINTS_ACHIEVED',
  'PRICE_RETURNED_TO_SIGNIFICANT_LEVEL',
  'FIRST_15_MIN_CANDLE_CLOSED',
  'TWO_5_MIN_CANDLES_CLOSED',
  // Include other relevant states if needed
];

// New color palette for states (consistent with funnel chart if desired)
const STATE_COLORS = [
  '#4e79a7', // initial
  '#f28e2c', // breakout_occurred
  '#e15759', // minimum_breakout_points_achieved
  '#76b7b2', // price_returned_to_significant_level
  '#59a14f', // first_15_min_candle_closed\n  '#edc948', // two_5_min_candles_closed
  // Add more colors if STATE_ORDER includes more states
];

// Helper function to format state names for display (optional, but good for legend)
function formatStateName(name: string): string {
  // Replace underscores with spaces and capitalize each word
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
            {' '}
            {/* Adjusted height */}
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
              <Legend
                formatter={(value: string) => formatStateName(value)}
              />{' '}
              {/* Format legend labels */}
              {/* Render Bars based on STATE_ORDER */}
              {STATE_ORDER.map((state, idx) => (
                <Bar
                  key={state}
                  dataKey={state.toLowerCase()} // Use lowercase data key to match backend
                  stackId='a' // Stack the bars for each hour
                  fill={STATE_COLORS[idx % STATE_COLORS.length]} // Use defined colors
                  name={formatStateName(state)} // Formatted name for legend/tooltip
                  // barSize={...} // Add barSize if needed
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
