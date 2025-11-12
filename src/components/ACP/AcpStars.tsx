import { useMemo } from 'react';

// State
import { useFetchAllStarsQuery } from 'src/state/api/appApi';

// Components
import { StarEntry } from './Stars/StarEntry';
import { LoadingPlaceholder } from './Stars/LoadingPlaceholder';
import { EmptyPlaceholder } from './Stars/EmptyPlaceholder';

export const AcpStars = () => {
    const { data: stars, isLoading: loadingStars } = useFetchAllStarsQuery();

    const entries = useMemo(() => {
        return (stars ?? []).map(star => <StarEntry key={star.id} star={star} />);
    }, [stars]);

    return (
        <div className="flex flex-col gap-3 p-2 relative">
            <button className="btn btn-block btn-primary btn-md rounded-xl">
                Δημιουργία Ταλέντου
            </button>

            {loadingStars && <LoadingPlaceholder />}

            {!loadingStars && entries.length !== 0 && (
                <div className="flex">
                    {entries}
                </div>
            )}

            {!loadingStars && entries.length === 0 && <EmptyPlaceholder />}
        </div>
    );
};