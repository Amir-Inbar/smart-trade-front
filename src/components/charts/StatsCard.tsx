import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';
import {Typography} from '@/components/ui/typography';
import {Container} from '@/components/ui/container';

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
    // Map column number to Tailwind grid class
    const getGridColsClass = (cols: number) => {
        switch (cols) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-3';
            case 4:
                return 'grid-cols-4';
            default:
                return 'grid-cols-1';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-32"/>
                ) : (
                    <Container className={`grid gap-4 ${getGridColsClass(columns)}`}>
                        {stats.map((stat, index) => (
                            <Container
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <Typography variant="h2" className="font-bold">
                                    {stat.value}
                                    {stat.suffix}
                                </Typography>
                                <Typography variant="muted" className="text-sm">
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
