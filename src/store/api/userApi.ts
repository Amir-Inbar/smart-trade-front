import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_HOST} from '@/config/consts';
import {UserSchema, UserSearchSchema} from "@/schemas/types";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_HOST,
    }),
    tagTypes: ['users'],
    endpoints: (builder) => ({
        searchUsers: builder.mutation<UserSchema[], UserSearchSchema>({
            query: (body) => ({
                url: 'users/search',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['users'],
        })
    }),
});

export const {
    useSearchUsersMutation,
} = userApi;
