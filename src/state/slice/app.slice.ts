import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react';

// Types
import type { User } from 'src/types';

type State = {
    user: User | null;
};

const initialState: State = {
    user: null,
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
        }
    }
});

export const {
    logout,
    setUser,
} = appSlice.actions;