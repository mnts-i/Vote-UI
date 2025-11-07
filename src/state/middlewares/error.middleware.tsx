import get from 'get-value';
import toast from 'react-hot-toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

// State
import { logout } from '../slice/app.slice';

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {

        // Set the error's toast message
        let message = 'Σφάλμα κατά τη σύνδεση!';

        const responseMessage = get(action, 'payload.data.message');

        if (typeof responseMessage === 'string') {
            message = responseMessage;
        }

        // Logout in case of a 401 error
        const status = get(action, 'payload.status') ?? undefined;

        if (status === 401) {
            api.dispatch(logout());
        }

        // Get the endpoint's name to use it as the toast's ID
        const endpointName = get(action.meta, 'arg.endpointName') ?? undefined;

        // Show the toast
        toast(message, { id: endpointName, icon: '😢' });
    }

    return next(action);
};