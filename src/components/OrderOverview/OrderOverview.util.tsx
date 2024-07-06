import {MRT_ColumnDef, MRT_Row, MRT_TableInstance} from "mantine-react-table";
import {OrderSchema} from "@/schemas/types";

export const getOrderOverviewColumns = () => {
    const orderOverviewColumns: MRT_ColumnDef<OrderSchema>[] = [
        {
            accessorKey: 'id',
            header: 'Id',
        },
        {
            accessorKey: 'trade_id',
            header: 'Trade Id',
        },
        {
            accessorKey: 'client_id',
            header: 'Client Id',
        },
        {
            accessorKey: 'action',
            header: 'Action',
        },
        {
            accessorKey: 'total_quantity',
            header: 'Total Quantity',
            AggregatedCell: ({
                                 row,
                                 table,
                             }: {
                row: MRT_Row<OrderSchema>;
                table: MRT_TableInstance<OrderSchema>;
            }) => (
                row.getLeafRows().reduce((acc, v) => acc + (v.original.total_quantity || 0), 0)
            ),
        },
        {
            accessorKey: 'order_type',
            header: 'Order Type',
        },
        {
            accessorKey: 'lmt_price',
            header: 'Lmt Price',
        },
        {
            accessorKey: 'tif',
            header: 'Tif',
        },
        {
            accessorKey: 'oca_group',
            header: 'Oca Group',
            AggregatedCell: ({
                                    row,
                                    table,
                                }: {
                    row: MRT_Row<OrderSchema>;
                    table: MRT_TableInstance<OrderSchema>;
                }) => {
                    return row.getLeafRows()[0].original.oca_group;
            }
        },
        {
            accessorKey: 'order_ref',
            header: 'Order Ref',
        },
        {
            accessorKey: 'transmit',
            header: 'Transmit',
        },
        {
            accessorKey: 'account',
            header: 'Account',
            AggregatedCell: ({
                                 row,
                                 table,
                             }: {
                row: MRT_Row<OrderSchema>;
                table: MRT_TableInstance<OrderSchema>;
            }) => {
                return row.getLeafRows()[0].original.account;
            }
        },
        {
            accessorKey: 'clearing_intent',
            header: 'Clearing Intent',
        },
        {
            accessorKey: 'algo_strategy',
            header: 'Algo Strategy',
        },
        {
            accessorKey: 'what_if',
            header: 'What If',
        },
        {
            accessorKey: 'aggregate',
            header: 'Total Cost per Trade',
            AggregatedCell: ({
                                 row,
                                 table,
                             }: {
                row: MRT_Row<OrderSchema>;
                table: MRT_TableInstance<OrderSchema>;
            }) => (
                <>
                    Total by{" "}
                    {table.getColumn(row.groupingColumnId ?? "").columnDef.header}:{" "}
                    {row
                        .getLeafRows()
                        .reduce((acc, v) => acc + (v.original.total_quantity || 0), 0)
                        .toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                </>
            ),
        },
    ];
    return orderOverviewColumns;
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
        grouping: ["trade_id"],
        density: "xs",
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
    },
};