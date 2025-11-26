import toast from 'react-hot-toast';
import { useAppSelector } from 'src/state/store';
import { useEffect, useState } from 'react';

// State
import { useSetResultsStageMutation } from 'src/state/api/appApi';

// Types
import { type Results } from 'src/types';

// Components
import { Modal } from 'src/components/Modal';
import { StageCard } from './StageCard';

export const StageResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);
    const isSelected = backendState.stage === 'RESULTS';

    const [modalOpened, setModalOpened] = useState(false);
    const [setStage, { isLoading, isSuccess }] = useSetResultsStageMutation();

    const onCardClick = () => setModalOpened(true);

    useEffect(() => {
        if (isSuccess) {
            toast((
                <span className="text-sm">
                    Η κατάσταση αλλάχθηκε σε: &nbsp;
                    <span className="text-blue-500 font-bold">
                        ΑΠΟΤΕΛΕΣΜΑΤΑ
                    </span>
                </span>
            ), { id: 'acp-voting' });
            setModalOpened(false);
        }
    }, [isSuccess]);

    const showingStar = isSelected ? backendState.stars.find(s => s.state === 'COUNTING') : null;
    const winningEntry = isSelected ? backendState.stars.reduce<Results['stars'][number] | null>((out, entry) => {
        if (!out) {
            return entry;
        }

        return out.shrunkScore >= entry.shrunkScore ? out : entry;
    }, null) : null;

    return (
        <>
            <StageCard
                title="Αποτελέσματα"
                description="Οθόνη προβολής τελικών αποτελεσμάτων"
                selected={isSelected}
                onClick={onCardClick}
            >
                {isSelected && (
                    <span className="flex flex-col gap-0.5 px-3 py-2 mt-1 text-sm font-bold bg-blue-500/30 text-blue-200 rounded-sm">
                        <span className="text-xs text-blue-300 font-light">
                            ΠΡΟΒΑΛΛΕΤΑΙ
                        </span>

                        <span className="flex items-center gap-2">
                            {showingStar && (
                                <>
                                    <span className="loading loading-spinner loading-xs" />

                                    <span>
                                    {showingStar.name}
                                    </span>
                                </>
                            )}

                            {!showingStar && (
                                <span className="text-blue-200">
                                    Τέλος προβολής
                                </span>
                            )}
                        </span>

                        <span className="text-xs text-blue-300 font-light pt-3">
                            ΝΙΚΗΤΗΣ
                        </span>

                        <span className="flex flex-col gap-0.5">
                            {winningEntry?.name ?? '-'}

                            {winningEntry && (
                                <span className="text-xs! font-normal text-blue-200!">
                                    ( Total: {winningEntry.totalScore / 2} &middot; Ψήφοι: {winningEntry.totalVotes} &middot; Avg: {winningEntry.avg / 2} &middot; Shrunk: {winningEntry.shrunkScore / 2} )
                                </span>
                            )}
                        </span>
                    </span>
                )}
            </StageCard>

            <Modal open={modalOpened} onClose={() => setModalOpened(false)} center>
                <div className="flex flex-col gap-5">
                    <h3 className="font-bold text-lg">
                        Αποτελέσματα
                    </h3>

                    <p>
                        Θέλετε σίγουρα να ξεκινήσει η διαδικασία προβολής αποτελεσμάτων;
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