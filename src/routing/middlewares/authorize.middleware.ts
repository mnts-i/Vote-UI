import { redirect, type MiddlewareFunction } from 'react-router';

// App state
import { store } from 'src/state/store';
import { logout } from 'src/state/slice/app.slice';

export const authorizeMiddleware: MiddlewareFunction = async (_, next) => {
    if (!Boolean(localStorage.getItem('t'))) {
        store.dispatch(logout());

        throw redirect('/login');
    }

    return await next();
};