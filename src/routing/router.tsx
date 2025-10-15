import { createBrowserRouter, redirect } from 'react-router';

// Middlewares
import { authMiddleware } from './middlewares/auth.middleware';

// Actions
import { loginAction } from './actions/login.action';

// Components
import { Root } from 'src/Root';
import { Login } from 'src/components/Login';
import { Dashboard } from 'src/components/Dashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            { 
                index: true, 
                Component: Dashboard, 
                middleware: [authMiddleware],
            },
            { 
                path: '/login', 
                Component: Login,
                action: loginAction,
            },
        ]
    }
]);