
// State
import { useAppSelector } from 'src/state/store';

// Components
import { StarFrame } from './StarFrame';

export const ViewPerforming = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'PERFORMING') {
        return null;
    }

    return (
        <div className="flex flex-col gap-10 w-full items-center justify-center">
            <StarFrame star={backendState.star} />
            
            <span className="text-xl font-semibold text-gray-200">
                {backendState.star.name}
            </span>
        </div>
    );
};