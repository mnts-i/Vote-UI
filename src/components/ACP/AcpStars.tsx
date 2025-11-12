import { useCallback, useMemo, useState } from 'react';

// State
import { useFetchAllStarsQuery } from 'src/state/api/appApi';

// Components
import { Modal } from '../Modal';
import { StarEntry } from './Stars/StarEntry';
import { StarCrudModal } from './Stars/StarCrudModal';
import { EmptyPlaceholder } from './Stars/EmptyPlaceholder';
import { LoadingPlaceholder } from './Stars/LoadingPlaceholder';

export const AcpStars = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const { data: stars, isLoading: loadingStars } = useFetchAllStarsQuery();

    const onModalClose = useCallback(() => setModalOpened(false), []);

    const entries = useMemo(() => {
        return (stars ?? []).map(star => <StarEntry key={star.id} star={star} />);
    }, [stars]);

    return (
        <div className="flex flex-col gap-3 p-2 relative">
            <button 
                onClick={() => setModalOpened(true)}
                className="btn btn-block btn-primary btn-md rounded-xl"
            >
                Δημιουργία Ταλέντου
            </button>

            {loadingStars && <LoadingPlaceholder />}

            {!loadingStars && entries.length !== 0 && (
                <div className="flex flex-col gap-2">
                    {entries}
                </div>
            )}

            {!loadingStars && entries.length === 0 && <EmptyPlaceholder />}

            <Modal open={modalOpened} onClose={onModalClose} closeOnOverlayClick={false} closeOnEsc={false} center>
                <StarCrudModal onClose={onModalClose} />
            </Modal>
        </div>
    );
};