import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_HOST} from '@/config/consts';
import {
    UserTPLevelDefaultSchema,
    UserTakeProfitLevelsDefaultSchemaUpdate,
    UserTakeProfitLevelsDefaultSchemaSearch,
} from '@/schemas/types';

export const userTakeProfitLevelsApi = createApi({
    reducerPath: 'userTakeProfitLevelsApi',
    baseQuery: fetchBaseQuery({baseUrl: API_HOST}),
    tagTypes: ['userTPDefaults'],
    endpoints: (builder) => ({
        searchUserTPDefaults: builder.mutation<
            UserTPLevelDefaultSchema[],
            {
                page?: number;
                page_size?: number;
                filters?: UserTakeProfitLevelsDefaultSchemaSearch | null;
            }
        >({
            query: (body) => ({
                url: 'user-tp-level-defaults/search',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['userTPDefaults'],
        }),
        getUserTPDefault: builder.query<UserTPLevelDefaultSchema, string>({
            query: (id) => `user-tp-level-defaults/${id}`,
            providesTags: (result, _err, id) =>
                result
                    ? [
                        {type: 'userTPDefaults', id},
                        {type: 'userTPDefaults', id: 'LIST'},
                    ]
                    : [{type: 'userTPDefaults', id: 'LIST'}],
        }),
        updateUserTPDefault: builder.mutation<
            UserTPLevelDefaultSchema,
            { userId: string; data: UserTakeProfitLevelsDefaultSchemaUpdate[] }
        >({
            query: ({userId, data}) => ({
                url: `user-tp-level-defaults/${userId}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const {
    useSearchUserTPDefaultsMutation,
    useGetUserTPDefaultQuery,
    useUpdateUserTPDefaultMutation,
} = userTakeProfitLevelsApi;
