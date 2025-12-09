
// State
import { useAppSelector } from 'src/state/store';

// Components
import { StarFrame } from './StarFrame';

export const ViewPerforming = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'PERFORMING') {
        return null;
    }

    const star = backendState.star;

    return (
        <div className="flex flex-col gap-5 w-full items-center justify-center">
            <StarFrame star={backendState.star} />

            <div className="flex flex-col pt-8 gap-0 justify-center items-center">
                <div className="text-2xl font-semibold text-gray-200 text-center">
                    {star.name}
                </div>

                {star.field && (
                    <span className="text-sm text-gray-400">
                        {star.field}
                    </span>
                )}
            </div>
        </div>
    );
};