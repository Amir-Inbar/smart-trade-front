import {SmartTable} from "@/components/SmartTable/SmartTable";
import {MRT_ColumnDef} from "mantine-react-table";
import {useEffect, useMemo} from "react";
import {useFetchTradesQuery} from "@/store/api/tradeApi";
import {getOrderOverviewColumns, OrderDataInitialState} from "./OrderOverview.util";
import {OrderSchema} from "@/schemas/types";
import useTradesStore from "@/store/actions/trade";

const OrderOverview = () => {
    const {data: fetchTrades = [], isSuccess} = useFetchTradesQuery();
    const {setTrades, trades} = useTradesStore();


    useEffect(() => {
        if (isSuccess) {
            setTrades(fetchTrades);
        }
    }, [isSuccess]);

    const columns = useMemo<MRT_ColumnDef<OrderSchema>[]>(
        () => [...getOrderOverviewColumns()],
        []
    );

    const orders: OrderSchema[] = trades.map((trade) => trade.orders).flat()
    // Need to change the orders to be a class object
    return (
        <SmartTable
            className="w-full"
            columns={columns}
            data={orders || []}
            config={OrderDataInitialState}
        />
    );
};

export default OrderOverview;
