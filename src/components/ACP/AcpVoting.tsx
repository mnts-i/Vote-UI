
// State
import { useAppSelector } from 'src/state/store';
import { useFetchAllStarsQuery } from 'src/state/api/appApi';

// Components
import { LoadingPlaceholder } from './Voting/LoadingPlaceholder';
import { StageCard } from './Voting/StageCard';
import { StageIdle } from './Voting/StageIdle';
import { StageVoting } from './Voting/StageVoting';
import { StagePerforming } from './Voting/StagePerforming';

export const AcpVoting = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    const { data, isFetching: loadingStars } = useFetchAllStarsQuery();

    const isLoadingData = loadingStars;

    return (
        <div className="p-2">
            {isLoadingData && (
                <LoadingPlaceholder />
            )}

            <div className="flex flex-col gap-2">
                <StageIdle />

                <StagePerforming />

                <StageVoting />

                <StageCard
                    title="Αποτελέσματα"
                    description="Οθόνη προβολής τελικών αποτελεσμάτων"
                    selected={backendState.stage === 'RESULTS'}
                />
            </div>
        </div>
    );
};