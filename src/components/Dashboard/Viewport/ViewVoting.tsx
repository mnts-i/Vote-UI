
// State
import { useAppSelector } from 'src/state/store';

export const ViewVoting = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'VOTING') {
        return null;
    }

    return (
        <div>

        </div>
    );
};