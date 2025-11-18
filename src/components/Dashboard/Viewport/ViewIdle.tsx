
// State
import { useAppSelector } from 'src/state/store';

// Components
import { StarFrame } from './StarFrame';

export const ViewIdle = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'IDLE') {
        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <StarFrame />
        </div>
    );
};