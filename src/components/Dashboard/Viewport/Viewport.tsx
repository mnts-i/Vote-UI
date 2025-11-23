
// State
import { useAppSelector } from 'src/state/store';

// Components
import { ViewIdle } from './ViewIdle';
import { ViewVoting } from './ViewVoting';
import { ViewResults } from './ViewResults';
import { ViewPerforming } from './ViewPerforming';

export const Viewport = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    return (
        <div className="flex px-4 py-9 justify-center items-center select-none">
            {backendState.stage === 'IDLE' && (
                <ViewIdle />
            )}

            {backendState.stage === 'VOTING' && (
                <ViewVoting />
            )}

            {backendState.stage === 'RESULTS' && (
                <ViewResults />
            )}

            {backendState.stage === 'PERFORMING' && (
                <ViewPerforming />
            )}
        </div>
    );
};