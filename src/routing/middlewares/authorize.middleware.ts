import { redirect, type MiddlewareFunction } from 'react-router';

// State
import { store, userAtom } from 'src/store';

export const authorizeMiddleware: MiddlewareFunction = async (_, next) => {
    if (!Boolean(localStorage.getItem('t'))) {
        store.set(userAtom, null);
        throw redirect('/login');
    }

    await next();
};