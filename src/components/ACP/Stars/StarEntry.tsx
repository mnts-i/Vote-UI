import toast from 'react-hot-toast';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';

// Types
import type { Star } from 'src/types';

// State
import { useDeleteStarMutation } from 'src/state/api/appApi';

// Components
import { Modal } from 'src/components/Modal';
import { StarCrudModal } from './StarCrudModal';

type ComponentProps = {
    star: Star;
};

export const StarEntry = ({ star }: ComponentProps) => {
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);

    const onModalClose = useCallback(() => setEditModalOpened(false), []);

    const [deleteStar, { isLoading: isDeleting, isSuccess: deleted }] = useDeleteStarMutation();

    useEffect(() => {
        if (deleted) { toast('Το ταλέντο διαγράφηκε επιτυχώς!', { id: 'acp-stars' }); }
    }, [deleted]);

    return (
        <>
            <div className="flex p-4 gap-4 bg-gray-900/50 justify-between items-center rounded-xl">
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                    <div className="flex gap-2  items-center">
                        {star.color && (
                            <div className="grow-0 w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: star.color }} />
                        )}

                        <span className="flex-1 text-sm text-gray-300 truncate">
                            {star.name}
                        </span>
                    </div>

                    <span className="text-xs text-gray-500 truncate">
                        {star.field ?? ''}
                    </span>
                </div>

                <div className="flex gap-2 grow-0">
                    <button
                        onClick={() => setDeleteModalOpened(true)}
                        className="btn btn-error btn-sm btn-square"
                    >
                        <FiTrash size={16} />
                    </button>

                    <button
                        onClick={() => setEditModalOpened(true)}
                        className="btn btn-primary btn-sm btn-square"
                    >
                        <FiEdit size={16} />
                    </button>
                </div>
            </div>

            {editModalOpened && (
                <Modal open={editModalOpened} onClose={onModalClose} closeOnOverlayClick={false} closeOnEsc={false} center>
                    <StarCrudModal
                        id={star.id}
                        onClose={onModalClose}
                    />
                </Modal>
            )}

            {deleteModalOpened && (
                <Modal open={deleteModalOpened} onClose={() => setDeleteModalOpened(false)} center>
                    <h3 className="font-bold text-lg">Προσοχή!</h3>
                    <p className="py-6">
                        Αυτή η ενέργεια θα διαγράψει οριστικά το ταλέντο!
                    </p>
                    <div className="flex justify-between">
                        <button className="btn btn-error" onClick={() => deleteStar(star.id)} disabled={!deleteModalOpened || isDeleting}>
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
            )}
        </>
    );
};