import { type MiddlewareFunction } from 'react-router';

// App state
import { store } from 'src/state/store';
import { appApi } from 'src/state/api/appApi';
import { logout, setUser } from 'src/state/slice/app.slice';

export const authenticateMiddleware: MiddlewareFunction = async (_ctx, next) => {
    const token = localStorage.getItem('t');

    if (typeof token === 'string') {
        try {
            const data = await store.dispatch(
                appApi.endpoints.validate.initiate(token)
            ).unwrap();

            store.dispatch(
                setUser(data.valid ? data.user : null)
            );

            if (!data.valid) {
                store.dispatch(logout());
            }
        } catch (err) {
            store.dispatch(logout());
        }
    }

    return await next();
};