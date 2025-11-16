import { configureStore } from '@reduxjs/toolkit/react';
import { useDispatch, useSelector } from 'react-redux';

// Middlewares
import { errorMiddleware } from './middlewares/error.middleware';
import { socketMiddleware } from './middlewares/socket.middleware';

// Slices
import { appSlice } from './slice/app.slice';

// APIs
import { appApi } from './api/appApi';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        [appApi.reducerPath]: appApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(appApi.middleware)
            .concat(errorMiddleware)
            .concat(socketMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<RootDispatch>();