
// State
import { useAppSelector } from 'src/state/store';

// Components
import { StarFrame } from './StarFrame';

export const ViewVoting = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'VOTING') {
        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <StarFrame star={backendState.star} />
        </div>
    );
};