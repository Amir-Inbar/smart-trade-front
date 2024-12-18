import {API_HOST} from "@/config/consts";
import {ContractSchema, ContractSchemaSearchSchema} from "@/schemas/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const contractApi = createApi({
    reducerPath: "contractApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST
    }),
    tagTypes: ["contracts"],
    endpoints: (builder) => ({
        searchContracts: builder.mutation<
            ContractSchema[],
            ContractSchemaSearchSchema
        >({
            query: (body) => ({
                url: "contracts/search",
                method: "POST",
                body
            }),
            invalidatesTags: ["contracts"]
        })
    })
});

export const {useSearchContractsMutation} = contractApi;
