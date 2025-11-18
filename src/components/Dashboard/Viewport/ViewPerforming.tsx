
// State
import { useAppSelector } from 'src/state/store';

export const ViewPerforming = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'PERFORMING') {
        return null;
    }

    return (
        <div>

        </div>
    );
};