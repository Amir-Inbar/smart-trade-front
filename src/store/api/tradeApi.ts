import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {TradeSchema, TradeSearchSchema} from "@/schemas/types";

export const tradeApi = createApi({
    reducerPath: "tradeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST
    }),
    tagTypes: ["trades"],
    endpoints: (builder) => ({
        searchTrades: builder.mutation<TradeSchema[], TradeSearchSchema>
        ({
            query: (body) => ({
                url: "trades/search",
                method: "POST",
                body
            }),
            invalidatesTags: ["trades"]
        }),
        cancelTradesByScenario: builder.mutation<void, { scenarioId: string }>({
            query: ({scenarioId}) => ({
                url: `trades/cancel_by_scenario`,
                method: "POST",
                body: {scenario_id: scenarioId},
            }),
            invalidatesTags: ["trades"],
        })
    })
});

export const {
    useSearchTradesMutation,
    useCancelTradesByScenarioMutation
} = tradeApi;
