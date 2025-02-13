import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {
    ScenarioSchema,
    ScenarioSchemaCreateSchema, ScenarioSchemaSearch, ScenarioSchemaUpdateSchema
} from "@/schemas/types";

export const scenarioApi = createApi({
    reducerPath: "scenarioApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST
    }),
    tagTypes: ["scenarios"],
    endpoints: (builder) => ({
        fetchScenarios: builder.query<ScenarioSchema[], void>({
            query: () => "scenarios",
            providesTags: ["scenarios"]
        }),
        searchScenarios: builder.mutation<ScenarioSchema[], ScenarioSchemaSearch>
        ({
            query: (body) => ({
                url: "scenarios/search",
                method: "POST",
                body
            }),
            invalidatesTags: ["scenarios"]
        }),
        createScenario: builder.mutation<
            ScenarioSchema,
            ScenarioSchemaCreateSchema
        >({
            query: (body) => ({
                url: "scenarios/",
                method: "POST",
                body
            })
        }),
        updateScenario: builder.mutation<ScenarioSchema, { scenarioId: string; fields: ScenarioSchemaUpdateSchema }>({
            query: ({scenarioId, fields}) => ({
                url: `scenarios/${scenarioId}`,
                method: "PUT",
                body: fields
            }),
            invalidatesTags: ["scenarios"]
        }),
        deleteScenario: builder.mutation<void, { scenarioId: string }>({
            query: ({scenarioId}) => ({
                url: `scenarios/${scenarioId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["scenarios"]
        })
    })
});

export const {
    useCreateScenarioMutation,
    useSearchScenariosMutation,
    useUpdateScenarioMutation,
    useDeleteScenarioMutation,
} = scenarioApi;
