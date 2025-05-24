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
import {Skeleton} from '@/components/ui/skeleton';

interface BarChartComponentProps {
    data: Record<string, number>;
    title: string;
    description: string;
    isLoading?: boolean;
    color?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export function BarChartComponent({
                                      data,
                                      title,
                                      description,
                                      isLoading = false,
                                      color = '#8884d8',
                                      xAxisLabel,
                                      yAxisLabel,
                                  }: BarChartComponentProps) {
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className='h-64'/>
                ) : (
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray='3 3'/>
                            <XAxis dataKey='name' label={xAxisLabel}/>
                            <YAxis label={yAxisLabel}/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey='value' fill={color}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
