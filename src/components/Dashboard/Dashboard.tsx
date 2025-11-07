import { Outlet, useNavigate } from 'react-router';

// App State
import { logout } from 'src/state/slice/app.slice';
import { useAppDispatch, useAppSelector } from 'src/state/store';

// Shared
import { glassStyles } from 'src/shared';

// Components
import { AcpControls } from './AcpControls';

export const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.app.user);
    const isAdmin = Boolean(user?.isAdmin);

    const onLogoutClick = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col p-5 gap-3 items-center">
            <div className="w-full max-w-lg overflow-hidden" style={glassStyles}>
                {isAdmin && <AcpControls />}

                <Outlet />
            </div>

            <button
                style={glassStyles}
                className="w-full max-w-lg h-10 text-red-500 bg-red-400/10! border-none! rounded-md!"
                onClick={onLogoutClick}
                tabIndex={-1}
            >
                Αποσύνδεση
            </button>
        </div>
    );
};