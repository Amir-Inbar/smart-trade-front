import { MRT_Row } from "mantine-react-table";
import { TradeSchema } from "@/schemas/types";

export const getTradesColumns = () => [
  {
    accessorKey: "scenario.id",
    header: "Scenario ID"
  },
  {
    accessorKey: "contract",
    header: "Contract Name",
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
          {orders.map((order) => order.id ? (
            <div key={order.id}>
              <strong>Action:</strong> {order.action},
              <strong> Quantity:</strong> {order.quantity},
              <strong> Type:</strong> {order.order_type},
              <strong> Price:</strong> {order.lmt_price}
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
