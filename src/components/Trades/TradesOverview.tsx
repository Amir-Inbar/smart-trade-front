import useTradeStore from "@/store/actions/trade";

export const TradesOverview = () => {
  const trades = useTradeStore((state) => state.trades);
  return (
    <div>
      {trades.map((trade) => (
        <div key={trade.id}>
          {trade.id}
        </div>
      ))}
    </div>
  );
};