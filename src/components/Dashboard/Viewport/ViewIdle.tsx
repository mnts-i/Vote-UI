
// State
import { useAppSelector } from 'src/state/store';

export const ViewIdle = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'IDLE') {
        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">

        </div>
    );
};