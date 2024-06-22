import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {API_HOST} from "../../utils/consts.ts";
import {DataSourceSchema} from "../../lib/types.ts";
import {InitialFormValues} from "../../components/CreateResourceDialog/CreateResourceDialog.tsx";

export const dataSourceApi = createApi({
    reducerPath: 'dataSourceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['DataSource'],
    endpoints: (builder) => ({
        fetchDataSources: builder.query<DataSourceSchema[], void>({
            query: () => ({
                url: `data_sources/search/`,
                providesTags: ['DataSource'],
            }),
        }),
        fetchDataSourcesByDatasetId: builder.query<DataSourceSchema[], { datasetId: string | undefined }>({
            query: ({datasetId}) => `data_sources/?dataset_id=${datasetId}`,
            providesTags: ['DataSource'],
        }),
        fetchDataSourceById: builder.query<DataSourceSchema, string>({
            query: (datasourceId) => `data_sources/${datasourceId}/`,
            providesTags: ['DataSource'],
        }),
        createDataSource: builder.mutation<InitialFormValues, InitialFormValues>({
            query: (dataSource) => ({
                url: `data_sources/`,
                method: 'POST',
                body: dataSource,
            }),
            invalidatesTags: ['DataSource'],
        }),
    }),
});

export const {
    useFetchDataSourcesQuery,
    useCreateDataSourceMutation,
    useFetchDataSourcesByDatasetIdQuery,
    useFetchDataSourceByIdQuery,
} = dataSourceApi;
