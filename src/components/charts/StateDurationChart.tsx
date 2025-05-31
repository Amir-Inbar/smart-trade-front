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

// Define the desired order of operational states
const STATE_ORDER = [
  'BREAKOUT_OCCURRED',
  'MINIMUM_BREAKOUT_POINTS_ACHIEVED',
  'PRICE_RETURNED_TO_SIGNIFICANT_LEVEL',
  'FIRST_15_MIN_CANDLE_CLOSED',
  'TWO_5_MIN_CANDLES_CLOSED',
  // COMPLETED and CANCELLED can also have durations, decide if you want to include them
];

// New default color
const DEFAULT_COLOR = '#76b7b2';

// Helper function to format state names for display (duplicated from Funnel chart)
function formatStateName(name: string): string {
  // Replace underscores with spaces and capitalize each word
  return name
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function StateDurationChart({
  data,
  title,
  description,
  isLoading = false,
}: StateDurationChartProps) {
  // Create chart data based on STATE_ORDER, providing 0 for missing states
  const chartData = STATE_ORDER.map((stateName) => {
    // Look up data using the lowercase version of the state name from the backend
    const duration = data[stateName.toLowerCase()];
    // If duration is undefined, use 0; otherwise, use the provided value
    return {
      name: formatStateName(stateName),
      value: duration !== undefined ? Number(duration.toFixed(2)) : 0, // Use value for chart dataKey
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
              {/* X-axis now shows state names in defined order */}
              <XAxis
                dataKey='name' // Use 'name' which contains formatted state names
                type='category'
                label={{ value: 'State', position: 'insideBottom', offset: -5 }}
                angle={30}
                textAnchor='start'
                interval={0}
                height={150}
              />
              {/* Y-axis shows duration values */}
              <YAxis
                type='number'
                label={{
                  value: 'Duration (minutes)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} minutes`, 'Duration']}
              />
              <Legend />
              {/* Use value as dataKey */}
              <Bar
                dataKey='value'
                fill={DEFAULT_COLOR}
                name='Average Duration'
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
