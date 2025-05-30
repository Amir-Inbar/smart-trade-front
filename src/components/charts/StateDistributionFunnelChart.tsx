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


interface StateDistributionFunnelChartProps {
  /**
   * Data for the funnel, mapping state names to the CUMULATIVE number of scenarios that reached that state.
   * Example: { "initial": 100, "breakout_occurred": 80, ... }
   */
  data: Record<string, number>;
  title: string;
  description: string;
  isLoading?: boolean;
}

// Define the desired order of operational states for the funnel visualization
// Using uppercase here internally for consistency, but we'll format for display
const STATE_ORDER = [
  'INITIAL',
  'BREAKOUT_OCCURRED',
  'MINIMUM_BREAKOUT_POINTS_ACHIEVED',
  'PRICE_RETURNED_TO_SIGNIFICANT_LEVEL',
  'FIRST_15_MIN_CANDLE_CLOSED',
  'TWO_5_MIN_CANDLES_CLOSED',
  // COMPLETED and CANCELLED might not fit a cumulative flow easily, depending on backend logic
];

// Helper function to format state names for display
function formatStateName(name: string): string {
  // Replace underscores with spaces and capitalize each word
  return name
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function StateDistributionFunnelChart({
  data,
  title,
  description,
  isLoading = false,
}: StateDistributionFunnelChartProps) {
  // Filter and sort the data based on the defined order, providing 0 for missing states
  const chartData = STATE_ORDER.map((stateName) => {
    // Look up data using the lowercase version of the state name from the backend
    const value = data[stateName.toLowerCase()];
    // If value is undefined, use 0; otherwise, use the provided value
    return {
      name: formatStateName(stateName),
      value: value !== undefined ? value : 0,
    };
  });

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
          <ResponsiveContainer width='100%' height={450}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='name'
                type='category'
                label={{ value: 'State', position: 'insideBottom', offset: -5 }}
                angle={-45}
                textAnchor='end'
                interval={0}
                height={150}
              />
              <YAxis
                type='number'
                label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                allowDecimals={false}
              />
              <Tooltip />
              <Bar
                dataKey='value'
                fill='#4e79a7'
                name='Number of Scenarios'
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
