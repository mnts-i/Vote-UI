import { redirect, type MiddlewareFunction } from 'react-router';

// App State
import { store } from 'src/state/store';

export const adminMiddleware: MiddlewareFunction = async (_ctx, next) => {
    const user = store.getState().app.user;

    if (!user || !user.isAdmin) {
        throw redirect('/');
    }

    return await next();
};