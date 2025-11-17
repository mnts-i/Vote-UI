import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/state/store';

// State
import { useFetchAllStarsQuery, useSetVotingStageMutation } from 'src/state/api/appApi';

// Shared - helpers
import { dateDiff } from 'src/shared';

// Components
import { Modal } from 'src/components/Modal';
import { StageCard } from './StageCard';

export const StageVoting = () => {
    const backendState = useAppSelector(state => state.app.backendState);
    const isSelected = backendState.stage === 'VOTING';

    const [ellapsed, setEllapsed] = useState('');
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedStar, setSelectedStar] = useState('');

    const { data, isFetching: loadingStars } = useFetchAllStarsQuery();
    const [setStage, { isLoading, isSuccess }] = useSetVotingStageMutation();

    const submitDisabled = loadingStars || !modalOpened || !data || data.length === 0 || !Boolean(selectedStar) || isLoading;

    const onCardClick = () => setModalOpened(true);

    const options = (data ?? []).map(({ id, name }) => <option key={id} value={id.toString()}>{name}</option>);

    useEffect(() => {
        if (isSuccess) {
            toast((
                <span className="text-sm">
                    Η κατάσταση αλλάχθηκε σε: &nbsp;
                    <span className="text-blue-500 font-bold">
                        ΨΗΦΟΦΟΡΙΑ
                    </span>
                </span>
            ), { id: 'acp-voting' });
            setModalOpened(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (backendState.stage !== 'VOTING') {
            return setEllapsed('');
        }

        const tick = () => setEllapsed(
            dateDiff(backendState.started)
        );

        tick();

        const interval = setInterval(tick, 1000);

        return () => { clearInterval(interval); };
    }, [backendState]);

    return (
        <>
            <StageCard
                title="Ψηφοφορία"
                description="Οθόνη ψηφοφορίας συγκεκριμένου ταλέντου"
                selected={isSelected}
                onClick={onCardClick}
            >
                {isSelected && (
                    <div className="flex flex-col gap-3">
                        <span className="flex flex-col gap-0.5 px-3 py-2 mt-1 text-sm font-bold bg-blue-500/30 text-blue-200 rounded-sm">
                            {backendState.star.name}

                            {backendState.star.field && (
                                <span className="text-xs text-blue-300 font-light">
                                    {backendState.star.field}
                                </span>
                            )}
                        </span>

                        <div className="flex text-xs justify-between">
                            <span>
                                Χρόνος: {ellapsed || '-'}
                            </span>
                            <span>
                                Ψήφοι: &nbsp;<strong>{backendState.currentVotes.toLocaleString()}</strong>
                            </span>
                        </div>
                    </div>
                )}
            </StageCard>

            <Modal open={modalOpened} onClose={() => setModalOpened(false)} center>
                <div className="flex flex-col gap-5">
                    <h3 className="font-bold text-lg">
                        Ψηφοφορία
                    </h3>

                    <select
                        value={selectedStar}
                        disabled={loadingStars}
                        className="select select-primary w-[80dvw] max-w-[280px]"
                        onChange={e => setSelectedStar(e.target.value)}
                    >
                        <option disabled={true} value="">Επιλογή ταλέντου</option>
                        {options}
                    </select>

                    <div className="flex gap-2 justify-between">
                        <button
                            className="btn btn-primary"
                            disabled={submitDisabled}
                            onClick={() => selectedStar ? setStage(+selectedStar) : null}
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