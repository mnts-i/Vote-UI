
// State
import { useAppSelector } from 'src/state/store';

export const ViewResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'RESULTS') {
        return null;
    }

    return (
        <div>

        </div>
    );
};