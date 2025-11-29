import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Socket.IO instance
import { socket } from '../middlewares/socket.middleware';

// Types
import type { Star, User } from 'src/types';
import type { MyVotePayload, MyVoteResponse, UploadStarImageArgs, ValidateResponse, VotePayload } from './types';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.DEV ? `http://${window.location.hostname}:54400/api` : '/api',
        prepareHeaders(headers) {
            headers.set('X-JWT', localStorage.getItem('t') ?? '');

            return headers;
        },
    }),
    tagTypes: ['Star', 'User', 'Token', 'Vote'],
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

        deleteAllTokens: build.mutation<{ affected?: number; }, undefined>({
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

        uploadStarImage: build.mutation<undefined, UploadStarImageArgs>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: '/stars/' + id + '/image',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),

        deleteStarImage: build.mutation<undefined, number>({
            query: (id) => ({
                url: '/stars/' + id + '/image',
                method: 'DELETE'
            }),
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),

        reorderStars: build.mutation<undefined, { ids: number[]; }>({
            query: (body) => ({
                url: '/stars/reorder',
                method: 'POST',
                body
            }),
            invalidatesTags: (_, error) => !error ? ['Star'] : [],
        }),

        // # ==================================================================== #
        // #                                                                      #
        // #                               STATE                                  #
        // #                                                                      #
        // # ==================================================================== #

        setIdleStage: build.mutation({
            query: () => ({
                url: '/state/idle',
                method: 'POST'
            }),
        }),

        setPerformingStage: build.mutation<void, number>({
            query: (id) => ({
                url: '/state/performing/' + id,
                method: 'POST'
            }),
        }),

        setVotingStage: build.mutation<void, number>({
            query: (id) => ({
                url: '/state/voting/' + id,
                method: 'POST'
            }),
        }),

        setResultsStage: build.mutation({
            query: () => ({
                url: '/state/results',
                method: 'POST'
            }),
        }),

        // # ==================================================================== #
        // #                                                                      #
        // #                               STATE                                  #
        // #                                                                      #
        // # ==================================================================== #

        vote: build.mutation<{ error?: string; }, VotePayload>({
            queryFn: (payload) => new Promise((resolve) => {

                // TODO: Add types
                socket.emit('vote', payload, (ack: { error?: string; }) => {
                    resolve({ data: ack });
                });
            }),
            invalidatesTags: (_, err) => !err ? ['Vote'] : [],
        }),

        myVote: build.query<number | null, MyVotePayload>({
            queryFn: (payload) => new Promise((resolve, reject) => {
                socket.emit('my-vote', payload, (ack: MyVoteResponse) => {
                    ack.error ? reject(ack.error) : resolve({ data: ack.vote });
                });
            }),
            providesTags: (_, err) => !err ? ['Vote'] : [],
        })
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
    useUploadStarImageMutation,
    useDeleteStarImageMutation,
    useReorderStarsMutation,

    useSetIdleStageMutation,
    useSetPerformingStageMutation,
    useSetVotingStageMutation,
    useSetResultsStageMutation,

    useVoteMutation,
    useMyVoteQuery,
    useLazyMyVoteQuery,
} = appApi;