import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import { useCallback, useEffect, useRef, useState, type ChangeEventHandler } from 'react';

// State
import { useDeleteAllTokensMutation, useFetchAllTokensQuery, useGenerateTokensMutation } from 'src/state/api/appApi';

// Components
import { Modal } from '../Modal';
import { TokenEntry } from './Users/TokenEntry';

const NUMBER_REGEX = new RegExp(/^[0-9]*$/);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const AcpUsers = () => {
    const [count, setCount] = useState('');

    const [printModalOpened, setPrintModalOpened] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const contentRef = useRef<HTMLDivElement>(null!);
    const printFn = useReactToPrint({ contentRef });

    const { data: tokens, isFetching } = useFetchAllTokensQuery(undefined);

    const [generateTokens, { isLoading: generating, isSuccess: generatedTokens }] = useGenerateTokensMutation();
    const [truncate, { data: deletionData, isLoading: isDeleting, isSuccess: deleted }] = useDeleteAllTokensMutation();

    useEffect(() => {
        if (deleted && deletionData) {
            toast(`Διαγράφηκαν ${deletionData.affected ?? 0} κλειδιά επιτυχώς!`, { id: 'acp-users' });
            setDeleteModalOpened(false);
        }
    }, [deletionData, deleted]);

    useEffect(() => {
        if (generatedTokens) {
            toast(`Τα κλειδιά δημιουργήθηκαν επιτυχώς!`, { id: 'acp-users' });
            setCount('');
        }
    }, [generatedTokens]);

    const onCountChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
        const value = e.target.value.trim();

        if (!NUMBER_REGEX.test(value)) {
            return;
        }

        setCount(value === '' ? value : clamp(+value, 1, 1000).toString());
    }, []);

    const onGenerateClick = () => {
        if (NUMBER_REGEX.test(count)) {
            generateTokens(+count);
        }
    };

    return (
        <div className="flex flex-col gap-3 p-2 relative">
            <div className="text-center p-4 bg-gray-900/60 text-gray-400 rounded-xl text-sm select-none">
                {isFetching && (
                    <span>
                        Φόρτωση δεδομένων...
                    </span>
                )}

                {!isFetching && (
                    <span>
                        Υπάρχουν - <strong className="text-blue-400">{tokens?.length ?? 0}</strong> - κλειδιά
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2 p-4 bg-gray-900/60 rounded-xl">
                <input
                    type="tel"
                    className="input w-auto"
                    min="1"
                    max="1000"
                    value={count}
                    onChange={onCountChange}
                    disabled={generating}
                />

                <button
                    className="btn btn-soft btn-block btn-success"
                    disabled={generating || count === ''}
                    onClick={onGenerateClick}
                >
                    {generating && (
                        <span className="loading loading-spinner"></span>
                    )}

                    Δημιουργία Κλειδιών
                </button>
            </div>

            <div className="flex gap-2 py-1">
                <button
                    className="flex-1 btn btn-error btn-ghost rounded-xl"
                    disabled={isDeleting}
                    // @ts-ignore
                    onClick={() => setDeleteModalOpened(true)}
                >
                    {isDeleting && (
                        <span className="loading loading-spinner"></span>
                    )}

                    Διαγραφή
                </button>

                <button
                    className="flex-1 btn btn-default btn-ghost rounded-xl"
                    disabled={isFetching}
                    onClick={() => setPrintModalOpened(true)}
                >
                    {isFetching && (
                        <span className="loading loading-spinner"></span>
                    )}

                    Εκτύπωση
                </button>
            </div>

            <Modal open={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} center>
                <h3 className="font-bold text-lg">Προσοχή!</h3>
                <p className="py-6">
                    Αυτή η ενέργεια θα διαγράψει <strong>όλα</strong> τα κλειδιά!
                </p>
                <div className="flex justify-between">
                    <button className="btn btn-error" onClick={() => truncate(undefined)} disabled={!deleteModalOpened || isDeleting}>
                        {isDeleting && (
                            <span className="loading loading-spinner"></span>
                        )}

                        Διαγραφή
                    </button>

                    <button className="btn" onClick={() => setDeleteModalOpened(false)}>
                        Ακύρωση
                    </button>
                </div>
            </Modal>

            <Modal open={printModalOpened && !!tokens && tokens.length !== 0} onClose={() => setPrintModalOpened(false)} center>
                <div className="flex flex-col gap-4 pt-8">
                    <button className="btn btn-block btn-lg btn-primary" onClick={() => printFn()}>
                        Εκτύπωση Λίστας Κλειδιών
                    </button>

                    <div className="flex flex-wrap" ref={contentRef}>
                        {(tokens ?? []).map(t => (
                            <TokenEntry key={t} token={t} />
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
};