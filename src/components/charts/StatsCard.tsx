import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { Container } from '@/components/ui/container';

interface StatItem {
  label: string;
  value: number | string;
  suffix?: string;
}

interface StatsCardProps {
  title: string;
  description: string;
  stats: StatItem[];
  isLoading?: boolean;
  columns?: number;
}

export function StatsCard({
  title,
  description,
  stats,
  isLoading = false,
  columns = 3,
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className='h-32' />
        ) : (
          <Container className={`grid grid-cols-${columns} gap-4`}>
            {stats.map((stat, index) => (
              <Container key={index} className='text-center'>
                <Typography variant='h2' className='font-bold'>
                  {stat.value}
                  {stat.suffix}
                </Typography>
                <Typography variant='muted' className='text-sm'>
                  {stat.label}
                </Typography>
              </Container>
            ))}
          </Container>
        )}
      </CardContent>
    </Card>
  );
}
