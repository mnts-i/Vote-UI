import { FiEdit, FiTrash } from 'react-icons/fi';
import { useCallback, useState } from 'react';

// Types
import type { Star } from 'src/types';

// Components
import { Modal } from 'src/components/Modal';
import { StarCrudModal } from './StarCrudModal';

type ComponentProps = {
    star: Star;
};

export const StarEntry = ({ star }: ComponentProps) => {
    const [modalOpened, setModalOpened] = useState(false);

    const onModalClose = useCallback(() => setModalOpened(false), []);

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
                        onClick={() => setModalOpened(true)}
                        className="btn btn-error btn-sm btn-square"
                    >
                        <FiTrash size={16} />
                    </button>

                    <button
                        onClick={() => setModalOpened(true)}
                        className="btn btn-primary btn-sm btn-square"
                    >
                        <FiEdit size={16} />
                    </button>
                </div>
            </div>

            {modalOpened && (
                <Modal open={modalOpened} onClose={onModalClose} closeOnOverlayClick={false} closeOnEsc={false} center>
                    <StarCrudModal
                        id={star.id}
                        onClose={onModalClose}
                    />
                </Modal>
            )}
        </>
    );
};