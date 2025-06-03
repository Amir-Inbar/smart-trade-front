import {PureComponent} from 'react';
import {Treemap, ResponsiveContainer, Tooltip} from 'recharts';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {Skeleton} from '@/components/ui/skeleton';

interface TradeExecutionTimeHeatmapChartProps {
    data: string[] | undefined;
    title: string;
    description: string;
    isLoading?: boolean;
}

interface HeatmapData {
    name: string;
    size: number;
    children?: HeatmapData[];
}

// Red gradient from dark to light
const COLORS = [
    '#7f1d1d', // dark red
    '#b91c1c',
    '#dc2626',
    '#ef4444',
    '#f87171',
    '#fee2e2', // light red
];

const processDataForTreemap = (
    timestamps: string[] | undefined
): HeatmapData[] => {
    if (!timestamps || timestamps.length === 0) return [];

    const hourCounts: Record<number, number> = Array.from(
        {length: 24},
        (_, i) => i
    ).reduce((acc, hour) => ({...acc, [hour]: 0}), {});

    timestamps.forEach((timestamp) => {
        try {
            const date = new Date(timestamp);
            const hour = date.getUTCHours(); // consistent UTC hour
            hourCounts[hour]++;
        } catch (err) {
            console.error('Invalid timestamp:', timestamp);
        }
    });

    const treemapData: HeatmapData[] = Object.entries(hourCounts)
        .filter(([_, count]) => count > 0)
        .map(([hour, count]) => ({
            name: `Hour ${hour}`,
            size: count,
        }));

    return [
        {
            name: 'Trade Execution Hours',
            size: 0,
            children: treemapData,
        },
    ];
};

class CustomizedContent extends PureComponent<any> {
    render() {
        const {root, depth, x, y, width, height, index, name, size} = this.props;
        const color =
            depth < 2
                ? COLORS[Math.floor((index / root.children.length) * COLORS.length)]
                : '#ffffff00';
        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: color,
                        stroke: '#fff',
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10),
                    }}
                />
                {depth === 1 ? (
                    <>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 7}
                            textAnchor='middle'
                            fill='#fff'
                            fontSize={14}
                        >
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 24}
                            textAnchor='middle'
                            fill='#fff'
                            fontSize={12}
                        >
                            Count: {size}
                        </text>
                    </>
                ) : null}
            </g>
        );
    }
}

export function TradeExecutionTimeHeatmapChart({
                                                   data,
                                                   title,
                                                   description,
                                                   isLoading = false,
                                               }: TradeExecutionTimeHeatmapChartProps) {
    const treemapData = processDataForTreemap(data);
    const hasValidData = treemapData?.[0]?.children?.some((c) => c.size > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
                {isLoading ? (
                    <Skeleton className='h-64 w-full'/>
                ) : hasValidData ? (
                    <ResponsiveContainer width='100%' height={300}>
                        <Treemap
                            data={treemapData[0].children}
                            dataKey='size'
                            stroke='#fff'
                            fill='#8884d8'
                            content={<CustomizedContent colors={COLORS}/>}
                            nameKey='name'
                        >
                            <Tooltip
                                formatter={(value: number, name: string) => [
                                    `Count: ${value}`,
                                    name,
                                ]}
                            />
                        </Treemap>
                    </ResponsiveContainer>
                ) : (
                    <div className='flex items-center justify-center h-full text-muted-foreground'>
                        No data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
