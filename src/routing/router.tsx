import { createBrowserRouter, redirect } from 'react-router';

// Middlewares
import { adminMiddleware } from './middlewares/admin.middleware';
import { authorizeMiddleware } from './middlewares/authorize.middleware';
import { authenticateMiddleware } from './middlewares/authenticate.middleware';

// Components
import { Root } from 'src/Root';
import { Login } from 'src/components/Login';
import { Results } from 'src/components/Results';
import { AcpUsers } from 'src/components/ACP/AcpUsers';
import { AcpStars } from 'src/components/ACP/AcpStars';
import { Viewport } from 'src/components/Dashboard/Viewport';
import { AcpVoting } from 'src/components/ACP/AcpVoting';
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
            },
            {
                path: '/',
                Component: Dashboard,
                middleware: [authorizeMiddleware],
                children: [
                    {
                        index: true,
                        Component: Viewport
                    },
                    {
                        path: '/acp-users',
                        middleware: [adminMiddleware],
                        Component: AcpUsers
                    },
                    {
                        path: '/acp-stars',
                        middleware: [adminMiddleware],
                        Component: AcpStars,
                    },
                    {
                        path: '/acp-voting',
                        middleware: [adminMiddleware],
                        Component: AcpVoting,
                    }
                ]
            },
        ]
    }
]);