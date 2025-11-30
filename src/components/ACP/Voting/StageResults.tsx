import toast from 'react-hot-toast';
import { useAppSelector } from 'src/state/store';
import { useCallback, useEffect, useState, type ChangeEventHandler } from 'react';

// State
import { useSetResultsStageMutation } from 'src/state/api/appApi';

// Types
import { type Results } from 'src/types';

// Components
import { Modal } from 'src/components/Modal';
import { StageCard } from './StageCard';

const NUMBER_REGEX = new RegExp(/^[0-9]*$/);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const StageResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);
    const isSelected = backendState.stage === 'RESULTS';

    const [duration, setDuration] = useState(90);
    const [modalOpened, setModalOpened] = useState(false);
    const [setStage, { isLoading, isSuccess }] = useSetResultsStageMutation();

    const onCardClick = () => setModalOpened(true);

    const onCountChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        const value = e.target.value.trim();

        if (!NUMBER_REGEX.test(value)) {
            return;
        }

        setDuration(value === '' ? +value : clamp(+value, 1, 600000));
    }, []);

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
                    <div className="flex flex-col gap-3 p-3 mt-1 text-sm font-bold bg-blue-500/30 text-blue-200 rounded-sm">
                        {!backendState.finished && (
                            <span className="flex flex-col items-center gap-1 p-3 bg-blue-300/30 rounded-sm">
                                <span className="loading loading-spinner loading-md" />

                                <span className="text-xs">
                                    Προβολή σε Εξέλιξη
                                </span>

                                <span className="text-xs text-blue-200/50">
                                    {backendState.progress.toFixed(2)}%
                                </span>
                            </span>
                        )}

                        <span className="flex flex-col gap-0.5">
                            <span className="text-xs text-blue-300 font-light">
                                ΝΙΚΗΤΗΣ
                            </span>

                            <span className="flex flex-col gap-0.5">
                                {winningEntry?.name ?? '-'}

                                {winningEntry && (
                                    <span className="text-xs! font-normal text-blue-200!">
                                        ( Total: {winningEntry.totalScore / 2} &middot; Ψήφοι: {winningEntry.totalVotes} &middot; Avg: {winningEntry.avg / 2} &middot; Shrunk: {(winningEntry.shrunkScore / 2).toFixed(2)} )
                                    </span>
                                )}
                            </span>
                        </span>
                    </div>
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

                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold">
                            Διάρκεια (δευτερόλεπτα)
                        </span>
                        <input
                            type="tel"
                            value={duration}
                            className="input w-auto"
                            onChange={onCountChange}
                        />
                    </div>

                    <div className="flex gap-2 justify-between">
                        <button
                            className="btn btn-primary"
                            disabled={!modalOpened || isLoading}
                            onClick={() => setStage(duration * 1000)}
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