import { type MiddlewareFunction } from 'react-router';

// Axios instance
import { http } from 'src/com/http';

// State
import { store, userAtom } from 'src/store';

// Types
import type { User } from 'src/types';

type AuthenticateResponse = {
    valid: true;
    user: User;
} | {
    valid: false;
};

export const authenticateMiddleware: MiddlewareFunction = async (ctx, next) => {
    const token = localStorage.getItem('t');
console.log(ctx)
    if (typeof token === 'string') {
        try {
            const { data } = await http.post<AuthenticateResponse>('/users/validate', { token });

            store.set(userAtom, data.valid ? data.user : null);

            if (!data.valid) {
                localStorage.removeItem('t');
            }
        } catch (err) {
            localStorage.removeItem('t');
            store.set(userAtom, null);
        }
    }

    await next();
};