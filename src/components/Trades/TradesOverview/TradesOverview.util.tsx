import { MRT_Row } from "mantine-react-table";
import { OperationalState, OrderStatusOptions, TradeSchema } from "@/schemas/types";

import { IconClock, IconCheck, IconX, IconAlertTriangle } from "@tabler/icons-react"; // Assuming you're using Tabler Icons

export const OrderStatusToConfig: {
  [key in OrderStatusOptions]: {
    label: string;
    color: string;
    icon: JSX.Element;
  };
} = {
  [OrderStatusOptions.PENDING]: {
    label: "Pending",
    color: "text-blue-500",
    icon: <IconClock size={16} className="text-blue-500" />
  },
  [OrderStatusOptions.FILLED]: {
    label: "Filled",
    color: "text-green-500",
    icon: <IconCheck size={16} className="text-green-500" />
  },
  [OrderStatusOptions.CANCELLED]: {
    label: "Cancelled",
    color: "text-red-500",
    icon: <IconX size={16} className="text-red-500" />
  },
  [OrderStatusOptions.ERROR]: {
    label: "Error",
    color: "text-yellow-500",
    icon: <IconAlertTriangle size={16} className="text-yellow-500" />
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
    Cell: ({ row }: { row: MRT_Row<TradeSchema> }) => {
      const contractName = row.original.contract?.name ?? "No contract name";
      return <span>{contractName}</span>;
    }
  },
  {
    accessorKey: "orders",
    header: "Orders",
    Cell: ({ row }: { row: MRT_Row<TradeSchema> }) => {
      const orders = row.original.orders ?? [];
      if (orders.length === 0) {
        return <div>No orders available</div>;
      }
      return (
        <div>
          {orders.map((order) => order.status ? (
            <div key={order.id} className="flex justify-between items-center py-2">
              <div>
                <strong>Action:</strong> {order.action},
                <strong> Quantity:</strong> {order.quantity},
                <strong> Type:</strong> {order.order_type},
                <strong> Price:</strong> {order.lmt_price},
                <strong> Broker ID:</strong> {order.broker_order_id}
              </div>

              <div className="text-right flex items-center">
                {OrderStatusToConfig[order.status] ? (
                  <span
                    className={`text-lg font-semibold flex items-center ${OrderStatusToConfig[order.status].color}`}>
                  <span>
                    {OrderStatusToConfig[order.status].icon}
                  </span>
                    <span className="ml-2">
                      {OrderStatusToConfig[order.status].label}
                    </span>
                </span>
                ) : (
                  <span className="text-lg font-semibold text-gray-500">Unknown Status</span>
                )}
              </div>
            </div>
          ) : null)}
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
    pagination: { pageIndex: 0, pageSize: 20 },
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
