import { useFetchAllStarsQuery } from 'src/state/api/appApi';

// Components
import { LoadingPlaceholder } from './Voting/LoadingPlaceholder';

export const AcpVoting = () => {
    const { data, isFetching: loadingStars } = useFetchAllStarsQuery();

    const isLoadingData = loadingStars;

    return (
        <div className="p-2">
            {isLoadingData && (
                <LoadingPlaceholder />
            )}

            
        </div>
    );
};