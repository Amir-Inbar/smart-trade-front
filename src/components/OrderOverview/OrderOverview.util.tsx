import {MRT_ColumnDef, MRT_Row} from "mantine-react-table";
import {ScenarioSchema, TakeProfitLevelSchema} from "@/schemas/types";


export const getScenarioColumns = (): MRT_ColumnDef<ScenarioSchema>[]  => {
    return [
        {
            accessorKey: 'id',
            header: 'ID'
        },
        {
            accessorKey: 'contract_id',
            header: 'Contract ID',
        },
        {
            accessorKey: 'is_quality_scenario',
            header: 'Quality Scenario',
        },
        {
            accessorKey: 'action',
            header: 'Action',
        },
        {
            accessorKey: 'select_strategy',
            header: 'Select Strategy',
        },
        {
            accessorKey: 'break_down_price',
            header: 'Break Down Price',
        },
        {
            accessorKey: 'enter_price',
            header: 'Enter Price',
        },
        {
            accessorKey: 'stop_price',
            header: 'Stop Price',
        },
        {
            accessorKey: 'stop_price_mode',
            header: 'Stop Price Mode',
        },
        {
            accessorKey: 'take_profit_levels',
            header: 'Take Profit Levels',
            Cell: ({row: {original}}: { row: MRT_Row<ScenarioSchema> }) => {
                if (!original.take_profit_levels) return <span/>;
                return (
                    <span>
                        {original.take_profit_levels.map((level: TakeProfitLevelSchema) => (
                            <span key={level.id}>{level.price}</span>
                        ))}
                    </span>
                );
            }
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
        },
    ];
}

export const OrderDataInitialState = {
    enableStickyHeader: true,
    enableTopToolbar: true,
    enableStickyFooter: true,
    enableColumnResizing: true,
    enableRowSelection: true,
    enableGrouping: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    paginationDisplayMode: "pages",
    initialState: {
        density: "xs",
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
    },
};

