import { io } from 'socket.io-client';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

// State
import { setBackendState, setSocketConnected } from '../slice/app.slice';

// Types
import type { State } from 'src/types';

let initialized = false;

export const socket = io(import.meta.env.DEV ? `http://${window.location.hostname}:54400` : '/', { autoConnect: true });

export const socketMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (!initialized) {
        initialized = true;

        socket.on('connect', () => {
            api.dispatch(setSocketConnected(true));
        });

        socket.on('disconnect', () => {
            api.dispatch(setSocketConnected(false));
        });

        socket.on('state', (data: State) => {
            api.dispatch(setBackendState(data));
        });
    }

    return next(action);
};