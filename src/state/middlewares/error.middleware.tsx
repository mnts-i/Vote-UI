import toast from 'react-hot-toast';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */
export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        let message = 'Σφάλμα κατά τη σύνδεση!';
        console.log(action)
        // if (typeof err?.response?.data?.message === 'string') {
        //     message = err.response.data.message;
        // }

        toast(message, { id: 'login-failure', icon: '😢' });
    }

    return next(action);
};