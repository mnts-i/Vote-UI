import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import type { Star, User } from 'src/types';
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
    tagTypes: ['Star', 'User', 'Token'],
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

        // # ==================================================================== #
        // #                                                                      #
        // #                              TOKENS                                  #
        // #                                                                      #
        // # ==================================================================== #

        generateTokens: build.mutation<void, number>({
            query: (count) => ({
                url: '/tokens/generate',
                body: { count },
                method: 'POST'
            }),
            invalidatesTags: (_, error) => !error ? ['Token'] : []
        }),

        fetchAllTokens: build.query<string[], undefined>({
            query: () => ({
                url: '/tokens/all',
                method: 'GET'
            }),
            providesTags: (_, error) => !error ? ['Token'] : [],
        }),

        deleteAllTokens: build.mutation<{ affected?: number }, undefined>({
            query: () => ({
                url: '/tokens/truncate',
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => !error ? ['Token'] : []
        }),

        // # ==================================================================== #
        // #                                                                      #
        // #                               STARS                                  #
        // #                                                                      #
        // # ==================================================================== #

        fetchAllStars: build.query<Star[], void>({
            query: () => ({
                url: '/stars/all',
                method: 'GET'
            }),
            providesTags: (_, error) => !error ? ['Star'] : [],
        }),

        fetchStar: build.query<Star, number>({
            query: (id) => ({
                url: '/stars/' + id,
                method: 'GET'
            }),
            providesTags: (star, error) => !error && star ? [{ type: 'Star', id: star.id }] : [],
        }),

        createStar: build.mutation<Star, Omit<Star, 'id'>>({
            query: (body) => ({
                url: '/stars',
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),

        updateStar: build.mutation<Star, Star>({
            query: (body) => ({
                url: '/stars/' + body.id,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),

        deleteStar: build.mutation<undefined, number>({
            query: (id) => ({
                url: '/stars/' + id,
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),
    })
});

export const {
    useLoginMutation,
    useValidateMutation,

    useGenerateTokensMutation,
    useFetchAllTokensQuery,
    useLazyFetchAllTokensQuery,
    useDeleteAllTokensMutation,

    useFetchAllStarsQuery,
    useLazyFetchAllStarsQuery,
    useFetchStarQuery,
    useLazyFetchStarQuery,
    useCreateStarMutation,
    useUpdateStarMutation,
    useDeleteStarMutation,

} = appApi;