import toast from 'react-hot-toast';
import classNames from 'classnames';
import { CSS } from '@dnd-kit/utilities';
import { RiCloseFill } from 'react-icons/ri';
import { useSortable } from '@dnd-kit/sortable';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { TbPhotoPlus, TbPhotoMinus } from 'react-icons/tb';
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties } from 'react';

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

const BASE_URL = import.meta.env.DEV ? `http://${window.location.hostname}:54400/images` : '/images';

export const StarEntry = ({ star }: ComponentProps) => {
    const nameInitials = star.name.split(/\s+/).map(s => s[0]).join('');

    const fileRef = useRef<HTMLInputElement>(null!);

    const [editModalOpened, setEditModalOpened] = useState(false);
    const [deleteStarModalOpened, setDeleteStarModalOpened] = useState(false);
    const [deleteImageModalOpened, setDeleteImageModalOpened] = useState(false);

    const onEditModalClose = useCallback(() => setEditModalOpened(false), []);

    const [deleteStar, { isLoading: isDeleting, isSuccess: deleted }] = useDeleteStarMutation();
    const [uploadImage, { isLoading: isUploading, isSuccess: uploaded }] = useUploadStarImageMutation();
    const [deleteStarImage, { isLoading: isDeletingImage, isSuccess: deletedImage }] = useDeleteStarImageMutation();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: star.id });

    const sortStyling: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        touchAction: 'manipulation',
        transition,
    };

    const onUploadClick = () => fileRef.current.click();

    const onUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];

        if (file && !isUploading) {
            uploadImage({ id: star.id, file });
        }
    };

    useEffect(() => {
        if (deleted) {
            toast('Το ταλέντο διαγράφηκε επιτυχώς!', { id: 'acp-stars' });
            setDeleteStarModalOpened(false);
        }
    }, [deleted]);

    useEffect(() => {
        if (deletedImage) {
            toast('Η φωτογραφία διαγράφηκε επιτυχώς!', { id: 'acp-stars' });
            setDeleteImageModalOpened(false);
        }
    }, [deletedImage]);

    useEffect(() => {
        if (uploaded) {
            toast('Η φωτογραφία αποθηκεύτηκε επιτυχώς!', { id: 'acp-stars' });
            fileRef.current.value = '';
            setDeleteImageModalOpened(false);
        }
    }, [uploaded]);

    return (
        <>
            <div
                ref={setNodeRef}
                className={classNames('flex p-4 gap-4 items-center rounded-xl relative select-none', {
                    'z-50': isDragging,
                    'shadow-lg': isDragging,
                    'bg-gray-900/95': isDragging,
                    'bg-gray-900/50': !isDragging,
                })}
                style={sortStyling}
            >
                <div className="flex-1 flex gap-6 items-center overflow-hidden">
                    {(star.color || star.image) && (
                        <div
                            className={classNames('avatar w-13 h-13 p-1 rounded-full', {
                                'avatar-placeholder': !star.image,
                                'border-3': Boolean(star.color)
                            })}
                            style={{
                                borderColor: star.color || undefined
                            }}
                        >
                            {isUploading && (
                                <div className="loading loading-spinner loading-xl" />
                            )}

                            {star.image && !isUploading && (
                                <img src={BASE_URL + '/' + star.image} className="rounded-full" />
                            )}

                            {!star.image && !isUploading && (
                                <div className="bg-gray-900/80 text-gray-400 rounded-full">
                                    <span className="text-md">{nameInitials}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-0">
                        <span className="flex-1 text-sm text-gray-300 truncate">
                            {star.name}
                        </span>

                        <span className="text-xs text-gray-500 truncate">
                            {star.field ?? ''}
                        </span>
                    </div>
                </div>

                <input
                    ref={fileRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={onUploadChange}
                    style={{ display: 'none' }}
                />

                <div className="fab fab-flower relative bottom-0 right-0 left-0 mr-9">
                    {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
                    <div tabIndex={0} role="button" className="btn btn-md btn-circle btn-primary btn-soft">
                        <HiOutlineCog6Tooth size={24} />
                    </div>

                    {/* Main Action button replaces the original button when FAB is open */}
                    <div className="fab-close">
                        <span className="btn btn-circle btn-md">
                            <RiCloseFill size={24} />
                        </span>
                    </div>

                    {/* buttons that show up when FAB is open */}
                    <button
                        className="btn btn-md btn-circle btn-primary"
                        onClick={() => setEditModalOpened(true)}
                    >
                        <FiEdit size={16} />
                    </button>
                    <button
                        className="btn btn-md btn-circle btn-primary"
                        disabled={isUploading || isDeletingImage}
                        onClick={onUploadClick}
                    >
                        {isUploading ? <span className="loading loading-spinner loading-sm" /> : <TbPhotoPlus size={18} />}
                    </button>
                    <button
                        type="button"
                        className="btn btn-md btn-circle btn-warning"
                        disabled={isUploading || isDeletingImage || !star.image}
                        onClick={() => setDeleteImageModalOpened(true)}
                    >
                        <TbPhotoMinus size={18} />
                    </button>
                    <button
                        className="btn btn-md btn-circle btn-error"
                        onClick={() => setDeleteStarModalOpened(true)}
                    >
                        <FiTrash size={16} />
                    </button>
                </div>

                <div
                    className="flex items-center justify-center w-10 absolute right-0 top-0 bottom-0 bg-gray-900/80 rounded-r-xl text-gray-600"
                    style={{ touchAction: 'none' }}
                    {...attributes}
                    {...listeners}
                >
                    <MdOutlineDragIndicator size={26} />
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

            {deleteImageModalOpened && (
                <Modal open={deleteImageModalOpened} onClose={() => setDeleteImageModalOpened(false)} center>
                    <h3 className="font-bold text-lg">Προσοχή!</h3>
                    <p className="py-6">
                        Θέλετε σίγουρα να διαγράψετε τη φωτογραφία του ταλέντου;
                    </p>
                    <div className="flex justify-between">
                        <button
                            className="btn btn-error"
                            onClick={() => deleteStarImage(star.id)}
                            disabled={!deleteImageModalOpened || !star.image || isDeleting || isDeletingImage || isUploading}
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