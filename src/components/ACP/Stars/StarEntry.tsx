import toast from 'react-hot-toast';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';

// Types
import type { Star } from 'src/types';

// State
import { useDeleteStarImageMutation, useDeleteStarMutation, useUploadStarImageMutation } from 'src/state/api/appApi';

// Components
import { Modal } from 'src/components/Modal';
import { StarCrudModal } from './StarCrudModal';

type ComponentProps = {
    star: Star;
};

export const StarEntry = ({ star }: ComponentProps) => {
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [deleteStarModalOpened, setDeleteStarModalOpened] = useState(false);
    const [deleteImageModalOpened, setDeleteImageModalOpened] = useState(false);

    const onEditModalClose = useCallback(() => setEditModalOpened(false), []);

    const [deleteStar, { isLoading: isDeleting, isSuccess: deleted }] = useDeleteStarMutation();
    const [uploadImage, { isLoading: isUploading, isSuccess: uploaded }] = useUploadStarImageMutation();
    const [deleteStarImage, { isLoading: isDeletingImage, isSuccess: deletedImage }] = useDeleteStarImageMutation();

    useEffect(() => {
        if (deleted) { toast('Το ταλέντο διαγράφηκε επιτυχώς!', { id: 'acp-stars' }); }
    }, [deleted]);

    useEffect(() => {
        if (deletedImage) { toast('Η φωτογραφία διαγράφηκε επιτυχώς!', { id: 'acp-stars' }); }
    }, [deletedImage]);

    useEffect(() => {
        if (uploaded) { toast('Η φωτογραφία αποθηκεύτηκε επιτυχώς!', { id: 'acp-stars' }); }
    }, [uploaded]);

    return (
        <>
            <div className="flex flex-col p-4 gap-4 bg-gray-900/50 rounded-xl">
                <div className="flex-1 flex gap-6 items-center overflow-hidden">
                    {star.color && (
                        <div className="grow-0 w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: star.color }} />
                    )}

                    {/* <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                            </div>
                        </div> */}

                    <div className="flex flex-col gap-0">
                        <span className="flex-1 text-sm text-gray-300 truncate">
                            {star.name}
                        </span>

                        <span className="text-xs text-gray-500 truncate">
                            {star.field ?? ''}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setDeleteStarModalOpened(true)}
                        className="btn btn-error btn-sm btn-square grow"
                    >
                        <FiTrash size={16} />
                    </button>

                    <button
                        onClick={() => setEditModalOpened(true)}
                        className="btn btn-primary btn-sm btn-square grow"
                    >
                        <FiEdit size={16} />
                    </button>

                    <button
                        onClick={() => setEditModalOpened(true)}
                        className="btn btn-primary btn-sm btn-square grow"
                    >
                        <FiEdit size={16} />
                    </button>

                    <button
                        onClick={() => setEditModalOpened(true)}
                        className="btn btn-primary btn-sm btn-square grow"
                    >
                        <FiEdit size={16} />
                    </button>
                </div>
            </div>

            {editModalOpened && (
                <Modal open={editModalOpened} onClose={onEditModalClose} closeOnOverlayClick={false} closeOnEsc={false} center>
                    <StarCrudModal
                        id={star.id}
                        onClose={onEditModalClose}
                    />
                </Modal>
            )}

            {deleteStarModalOpened && (
                <Modal open={deleteStarModalOpened} onClose={() => setDeleteStarModalOpened(false)} center>
                    <h3 className="font-bold text-lg">Προσοχή!</h3>
                    <p className="py-6">
                        Αυτή η ενέργεια θα διαγράψει οριστικά το ταλέντο!
                    </p>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-error"
                            onClick={() => deleteStar(star.id)}
                            disabled={!deleteStarModalOpened || isDeleting || isDeletingImage || isUploading}
                        >
                            {isDeleting && (
                                <span className="loading loading-spinner"></span>
                            )}

                            Διαγραφή
                        </button>

                        <button className="btn" onClick={() => setDeleteStarModalOpened(false)}>
                            Ακύρωση
                        </button>
                    </div>
                </Modal>
            )}

            {deleteImageModalOpened && star.image && (
                <Modal open={deleteImageModalOpened} onClose={() => setDeleteImageModalOpened(false)} center>
                    <h3 className="font-bold text-lg">Προσοχή!</h3>
                    <p className="py-6">
                        Θέλετε σίγουρα να διαγράψετε τη φωτογραφία του ταλέντου;
                    </p>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-error"
                            onClick={() => deleteStar(star.id)}
                            disabled={!deleteStarModalOpened || isDeleting || isDeletingImage || isUploading}
                        >
                            {isDeletingImage && (
                                <span className="loading loading-spinner"></span>
                            )}

                            Διαγραφή
                        </button>

                        <button className="btn" onClick={() => setDeleteImageModalOpened(false)}>
                            Ακύρωση
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};