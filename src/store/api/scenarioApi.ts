import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "@/config/consts";
import {ScenarioSchema} from "@/schemas/types";
import {ScenarioSchemaFormValues} from "@/components/Scenarios/Scenarios.util";

export const scenarioApi = createApi({
    reducerPath: 'scenarioApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['scenarios'],
    endpoints: (builder) => ({
        fetchScenarios: builder.query<ScenarioSchema[], void>({
            query: () => 'scenarios',
            providesTags: ['scenarios'],
        }),
        createScenario: builder.mutation<ScenarioSchemaFormValues, ScenarioSchema>({
            query: (body) => ({
                url: 'scenarios',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['scenarios'],
        }),
        updateScenario: builder.mutation<ScenarioSchema, ScenarioSchema>({
            query: (body) => ({
                url: `scenarios/${body.id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['scenarios'],
        }),
    }),
});

export const {
    useFetchScenariosQuery,
    useCreateScenarioMutation,
    useUpdateScenarioMutation
} = scenarioApi;
