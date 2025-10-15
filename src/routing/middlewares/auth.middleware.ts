import { redirect, type MiddlewareFunction } from 'react-router';
import { http } from 'src/com/http';

export const authMiddleware: MiddlewareFunction = async (_, next) => {
    const token = localStorage.getItem('t');

    if (!token) {
        throw redirect('/login');
    }

    try {
        const { data } = await http.post<{ valid: boolean; }>('/users/validate', { token });

        if (!data.valid) {
            throw redirect('/login');
        }
    } catch (err) {
        throw redirect('/login');
    }

    await next();
};