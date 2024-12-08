"use client";

import { SmartTable } from "@/components/SmartTable/SmartTable";
import { useEffect, useMemo } from "react";
import useTradeStore from "@/store/actions/trade";
import { useSearchTradesMutation } from "@/store/api/tradeApi";
import {
  getTradesColumns,
  TradesOverviewDataInitialState
} from "@/components/Trades/TradesOverview/TradesOverview.util";

export const TradesOverview = () => {
  const [searchTrades, { data }] = useSearchTradesMutation();
  const { trades, setTrades } = useTradeStore();

  const fetchTrades = async () => {
    const scenarios = await searchTrades({}).unwrap();
    setTrades(scenarios);
  };

  useEffect(() => {
    if (data) {
      setTrades(data);
    } else {
      fetchTrades();
    }
  }, [data, setTrades]);


  const columns = useMemo(() => getTradesColumns(), []);
  const config = TradesOverviewDataInitialState();

  if (!trades || trades.length === 0) {
    return <div>No trades available</div>;
  }

  return (
    <SmartTable
      className="w-full"
      columns={columns}
      data={trades}
      config={config}
    />
  );
};

