import { useEffect, useState } from 'react';

// State
import { useDeleteAllTokensMutation } from 'src/state/api/appApi';

// Components
import { Modal } from '../Modal';
import toast from 'react-hot-toast';

export const AcpUsers = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const [truncate, { data, isLoading, isSuccess }] = useDeleteAllTokensMutation();

    useEffect(() => {
        if (isSuccess && data) {
            toast(`Διαγράφηκαν ${data.affected ?? 0} κλειδιά επιτυχώς!`, { id: 'acp-users' });
            setModalOpened(false);
        }
    }, [data, isSuccess]);

    return (
        <div className="p-4 relative">
            <button
                className="btn btn-block btn-error btn-outline rounded-xl"
                disabled={isLoading}
                // @ts-ignore
                onClick={() => setModalOpened(true)}
            >
                {isLoading && (
                    <span className="loading loading-spinner"></span>
                )}

                Διαγραφή Κλειδιών
            </button>

            <Modal open={modalOpened} onClose={() => setModalOpened(false)} center>
                <h3 className="font-bold text-lg">Προσοχή!</h3>
                <p className="py-6">
                    Αυτή η ενέργεια θα διαγράψει <strong>όλα</strong> τα κλειδιά!
                </p>
                <div className="flex justify-between">
                    <button className="btn btn-error" onClick={() => truncate(undefined)} disabled={!modalOpened || isLoading}>
                        {isLoading && (
                            <span className="loading loading-spinner"></span>
                        )}

                        Διαγραφή
                    </button>

                    <button className="btn" onClick={() => setModalOpened(false)}>
                        Ακύρωση
                    </button>
                </div>
            </Modal>
        </div>
    );
};