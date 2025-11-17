import toast from 'react-hot-toast';
import { useAppSelector } from 'src/state/store';
import { useEffect, useState } from 'react';

// State
import { useSetIdleStageMutation } from 'src/state/api/appApi';

// Components
import { Modal } from 'src/components/Modal';
import { StageCard } from './StageCard';

export const StageIdle = () => {
    const backendState = useAppSelector(state => state.app.backendState);
    const isSelected = backendState.stage === 'IDLE';

    const [modalOpened, setModalOpened] = useState(false);
    const [setStage, { isLoading, isSuccess }] = useSetIdleStageMutation();

    const onCardClick = () => setModalOpened(true);

    useEffect(() => {
        if (isSuccess) {
            toast((
                <span className="text-sm">
                    Η κατάσταση αλλάχθηκε σε: &nbsp;
                    <span className="text-blue-500 font-bold">
                        ΑΝΑΜΟΝΗ
                    </span>
                </span>
            ), { id: 'acp-voting' });
            setModalOpened(false);
        }
    }, [isSuccess]);

    return (
        <>
            <StageCard
                title="Αναμονή"
                description="Οθόνη αναμονής"
                selected={isSelected}
                onClick={onCardClick}
            />

            <Modal open={modalOpened} onClose={() => setModalOpened(false)} center>
                <div className="flex flex-col gap-5">
                    <h3 className="font-bold text-lg">
                        Αναμονή
                    </h3>

                    <p>
                        Θέλετε σίγουρα να μεταβεί σε κατάσταση αναμονής;
                    </p>

                    <div className="flex gap-2 justify-between">
                        <button
                            className="btn btn-primary"
                            disabled={!modalOpened || isLoading}
                            onClick={() => setStage(undefined)}
                        >
                            Εφαρμογή
                        </button>

                        <button className="btn" onClick={() => setModalOpened(false)}>
                            Ακύρωση
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};