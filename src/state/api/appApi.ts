import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { User } from 'src/types';
import type { ValidateResponse } from './types';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.DEV ? `http://${window.location.hostname}:54400/api` : '/api',
        prepareHeaders(headers) {
            headers.set('X-JWT', localStorage.getItem('t') ?? '');

            return headers;
        },
    }),
    tagTypes: ['Star', 'User'],
    endpoints: (build) => ({
        login: build.mutation<User, string>({
            query: (token) => ({
                url: '/users/login',
                body: { token },
                method: 'POST'
            })
        }),

        validate: build.mutation<ValidateResponse, string>({
            query: (token) => ({
                url: '/users/validate',
                body: { token },
                method: 'POST'
            })
        }),

        deleteAllTokens: build.mutation<{ affected?: number }, undefined>({
            query: () => ({
                url: '/tokens/truncate',
                method: 'DELETE'
            })
        }),
    })
});

export const {
    useLoginMutation,
    useValidateMutation,

    useDeleteAllTokensMutation,
} = appApi;