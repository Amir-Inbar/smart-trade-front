import { useSearchTradesMutation } from "@/store/api/tradeApi";

export const TradesOverview = () => {
  const [_, { data, isLoading }] = useSearchTradesMutation({});
  console.log(data);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};