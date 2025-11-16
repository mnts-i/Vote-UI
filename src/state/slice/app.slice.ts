import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';

// Types
import type { User, State as BackendState } from 'src/types';

type State = {
    user: User | null;
    backendState: BackendState;
    socketConnected: boolean;
};

const initialState: State = {
    user: null,
    backendState: { stage: 'IDLE' },
    socketConnected: false,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('t');
            state.user = null;
        },

        setUser: (state, { payload }: PayloadAction<User | null>) => {
            state.user = payload;
        },

        setBackendState: (state, { payload }: PayloadAction<BackendState>) => {
            state.backendState = payload;
        },

        setSocketConnected: (state, { payload }: PayloadAction<boolean>) => {
            state.socketConnected = payload;
        },
    }
});

export const {
    logout,
    setUser,
    setBackendState,
    setSocketConnected,
} = appSlice.actions;