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

import type {TreemapNode} from 'recharts/types/chart/Treemap';
import {ReactElement} from 'react';

const TreemapCell = (
    props: TreemapNode & { root: TreemapNode }
): ReactElement => {
    const {depth, x, y, width, height, name, size} = props;

    if (width <= 0 || height <= 0) return <></>;

    const maxSize = Math.max(...props.root.children.map((c: any) => c.size));
    const lightness = 80 - (size / maxSize) * 50;
    const fill = `hsl(0, 100%, ${lightness}%)`;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{fill, stroke: '#fff', strokeWidth: 1}}
            />
            {depth === 1 && (
                <>
                    <text
                        x={x + width / 2}
                        y={y + height / 2 - 6}
                        textAnchor='middle'
                        fill='#fff'
                        fontSize={12}
                    >
                        {name}
                    </text>
                    <text
                        x={x + width / 2}
                        y={y + height / 2 + 10}
                        textAnchor='middle'
                        fill='#fff'
                        fontSize={12}
                    >
                        Count: {size}
                    </text>
                </>
            )}
        </g>
    );
};

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
                            dataKey="size"
                            stroke="#fff"
                            fill="#8884d8"
                            content={TreemapCell}
                            nameKey="name"
                        >
                            <Tooltip
                                formatter={(value: number, name: string, props: any) => [
                                    `Count: ${value}`,
                                    props.payload.name, // name = Hour X
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
