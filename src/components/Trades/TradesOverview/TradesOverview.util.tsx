import {MRT_Row} from "mantine-react-table";
import {OrderStatusOptions, TradeSchema} from "@/schemas/types";

import {IconClock, IconCheck, IconX, IconAlertTriangle} from "@tabler/icons-react";
import {ReactElement} from "react"; // Assuming you're using Tabler Icons

export const OrderStatusToConfig: {
    [key in OrderStatusOptions]: {
        label: string;
        color: string;
        icon: ReactElement;
    };
} = {
    [OrderStatusOptions.PENDING]: {
        label: "Pending",
        color: "text-blue-500",
        icon: <IconClock size={16} className="text-blue-500"/>
    },
    [OrderStatusOptions.FILLED]: {
        label: "Filled",
        color: "text-green-500",
        icon: <IconCheck size={16} className="text-green-500"/>
    },
    [OrderStatusOptions.CANCELLED]: {
        label: "Cancelled",
        color: "text-red-500",
        icon: <IconX size={16} className="text-red-500"/>
    },
    [OrderStatusOptions.ERROR]: {
        label: "Error",
        color: "text-yellow-500",
        icon: <IconAlertTriangle size={16} className="text-yellow-500"/>
    }
};


export const getTradesColumns = () => [
    {
        accessorKey: "scenario.id",
        header: "Scenario ID",
        size: 100
    },
    {
        accessorKey: "contract",
        header: "Contract Name",
        size: 30,
        Cell: ({row}: { row: MRT_Row<TradeSchema> }) => {
            const contractName = row.original.contract?.name ?? "No contract name";
            return <span>{contractName}</span>;
        }
    },
    {
        accessorKey: "orders",
        header: "Orders",
        Cell: ({row}: { row: MRT_Row<TradeSchema> }) => {
            const orders = row.original.orders ?? [];
            if (orders.length === 0) {
                return <div>No orders available</div>;
            }

            const entryOrder = orders.find((o) => o.action === "BUY");
            const stopLossOrder = orders.find((o) => o.action === "SELL" && o.order_type === "STP");
            const takeProfitOrders = orders.filter((o) => o.action === "SELL" && o.order_type === "LMT");

            return (
                <div className="space-y-2 w-1/3">
                    <div>
                        <strong>Action | Quantity | Price</strong>
                    </div>
                    {entryOrder && (
                        <div className="border p-2 rounded text-blue-100 ׳">
                            <strong>Entry:</strong> {entryOrder.quantity} | {entryOrder.lmt_price}
                        </div>
                    )}
                    {stopLossOrder && (
                        <div className="border p-2 rounded text-red-100">
                            <strong>Stop Loss:</strong> {stopLossOrder.quantity} | {stopLossOrder.lmt_price}
                        </div>
                    )}
                    {takeProfitOrders.map((order, index) => (
                        <div key={order.id} className="border p-2 rounded text-green-100">
                            <strong>Take Profit {index + 1}:</strong> {order.quantity} | {order.lmt_price}
                        </div>
                    ))}
                </div>
            );
        }
    }
];


export const TradesOverviewDataInitialState = () => ({
    enableGrouping: true,
    enableStickyHeader: true,
    enableTopToolbar: true,
    enableStickyFooter: true,
    enableColumnResizing: true,
    enableRowSelection: false,
    editDisplayMode: "modal",
    enableFullScreenToggle: true,
    enableHiding: true,
    paginationDisplayMode: "pages",
    initialState: {
        grouping: ["scenario.id"],
        density: "xs",
        expanded: true,
        pagination: {pageIndex: 0, pageSize: 20},
        columnVisibility: {
            id: false,
            contract_id: false,
            stop_price_mode: false,
            description: false,
            created_at: false,
            updated_at: false
        }
    }
});
