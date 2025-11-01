import { useAtom } from 'jotai';
import { useNavigate } from 'react-router';

// State
import { userAtom } from 'src/store';

// Shared
import { glassStyles } from 'src/shared';

// Components
import { AcpControls } from './ACP/Controls';

export const Dashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useAtom(userAtom);
    const isAdmin = Boolean(user?.isAdmin);

    const onLogoutClick = () => {
        localStorage.removeItem('t');
        setUser(null);
        navigate('/login');
    }

    return (
        <div className="p-5">
            <div className="overflow-hidden" style={glassStyles}>
                {isAdmin && <AcpControls />}
                fsafsaf - {user?.id}

                <span onClick={onLogoutClick}>
                    Αποσύνδεση
                </span>
            </div>
        </div>
    );
};