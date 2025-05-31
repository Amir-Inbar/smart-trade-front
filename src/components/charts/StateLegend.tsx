import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';

// Define the desired order of states for the legend
const STATE_ORDER: string[] = [
  'Initial',
  'Breakout Occurred',
  'Minimum Breakout Points Achieved',
  'Price Returned To Significant Level',
  'First 15 Min Candle Closed',
  'Two 5 Min Candles Closed',
];

// Define a color palette for the states (consistent with charts)
const STATE_COLORS: Record<string, string> = {
  Initial: '#3B82F6', // Blue
  'Breakout Occurred': '#F59E0B', // Orange
  'Minimum Breakout Points Achieved': '#EF4444', // Red
  'Price Returned To Significant Level': '#06B6D4', // Cyan
  'First 15 Min Candle Closed': '#22C55E', // Green
  'Two 5 Min Candles Closed': '#FACC15', // Yellow
};

// Helper function to format state names for display
function formatXAxisLabel(label: string) {
  return label
    .replace('Minimum Breakout Points Achieved', 'Min Breakout')
    .replace('Price Returned To Significant Level', 'Price Returned')
    .replace('First 15 Min Candle Closed', '15-min Closed')
    .replace('Two 5 Min Candles Closed', '2×5-min Closed')
    .replace('Breakout Occurred', 'Breakout')
    .replace('Initial', 'Initial');
}

export function StateLegend() {
  return (
    <Card className='p-4'>
      <Typography variant='h4' className='mb-2'>
        State Legend
      </Typography>
      <Container className='flex flex-wrap gap-x-4 gap-y-2'>
        {STATE_ORDER.map((state) => (
          <div key={state} className='flex items-center space-x-1'>
            <span
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: STATE_COLORS[state] || '#ccc' }} // Default to grey if color missing
            ></span>
            <Typography variant='muted' className='text-sm'>
              {formatXAxisLabel(state)}
            </Typography>
          </div>
        ))}
      </Container>
    </Card>
  );
}
