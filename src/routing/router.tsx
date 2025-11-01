import { createBrowserRouter, redirect } from 'react-router';

// Middlewares
import { authorizeMiddleware } from './middlewares/authorize.middleware';
import { authenticateMiddleware } from './middlewares/authenticate.middleware';

// Actions
import { loginAction } from './actions/login.action';

// Components
import { Root } from 'src/Root';
import { Login } from 'src/components/Login';
import { Results } from 'src/components/Results';
import { Dashboard } from 'src/components/Dashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        middleware: [authenticateMiddleware],
        children: [
            {
                path: '/results',
                Component: Results,
            },
            { 
                path: '/login', 
                Component: Login,
                middleware: [async (_, next) => {
                    if (Boolean(localStorage.getItem('t'))) {
                        throw redirect('/');
                    }

                    return await next();
                }],
                action: loginAction,
            },
            { 
                index: true, 
                Component: Dashboard,
                middleware: [authorizeMiddleware],
            },
        ]
    }
]);