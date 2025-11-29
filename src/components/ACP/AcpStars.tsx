import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    TouchSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
    restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';

// State
import { useFetchAllStarsQuery, useReorderStarsMutation } from 'src/state/api/appApi';

// Types
import { type Star } from 'src/types';

// Components
import { Modal } from '../Modal';
import { StarEntry } from './Stars/StarEntry';
import { StarCrudModal } from './Stars/StarCrudModal';
import { EmptyPlaceholder } from './Stars/EmptyPlaceholder';
import { LoadingPlaceholder } from './Stars/LoadingPlaceholder';

export const AcpStars = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [modalOpened, setModalOpened] = useState(false);

    const { data: loadedStars, isFetching: loadingStars, isLoading: initialStarsLoad } = useFetchAllStarsQuery();
    const [reorderStars, { isLoading: isReordering, isSuccess: reordered }] = useReorderStarsMutation();

    const onModalClose = useCallback(() => setModalOpened(false), []);

    const onReorder = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && active.id !== over.id) {
            const oldIndex = stars.findIndex(s => s.id === active.id);
            const newIndex = stars.findIndex(s => s.id === over.id);

            const newOrder = arrayMove([...stars], oldIndex, newIndex);

            setStars(newOrder);
            reorderStars({ ids: newOrder.map(s => s.id) });
        }
    };

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor),
    );

    useEffect(() => {
        if (loadedStars && !loadingStars) {
            setStars([...loadedStars]);
        }
    }, [loadedStars, loadingStars]);

    useEffect(() => {
        if (reordered) {
            toast('Η σειρά των ταλέντων άλλαξε επιτυχώς!', { id: 'acp-stars' });
        }
    }, [reordered]);

    return (
        <div className="flex flex-col gap-3 p-2 relative">
            <button
                onClick={() => setModalOpened(true)}
                className="btn btn-block btn-primary btn-md rounded-xl"
            >
                Δημιουργία Ταλέντου
            </button>

            {initialStarsLoad && <LoadingPlaceholder />}

            {!initialStarsLoad && stars.length !== 0 && (
                <div
                    className="flex flex-col gap-2"
                >
                    <DndContext
                        sensors={sensors}
                        onDragEnd={onReorder}
                        modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
                        collisionDetection={closestCenter}
                    >
                        <SortableContext
                            items={stars}
                            disabled={isReordering}
                            strategy={verticalListSortingStrategy}
                        >
                            {stars.map(star => <StarEntry key={star.id} star={star} />)}
                        </SortableContext>
                    </DndContext>
                </div>
            )}

            {!initialStarsLoad && stars.length === 0 && <EmptyPlaceholder />}

            <Modal open={modalOpened} onClose={onModalClose} closeOnOverlayClick={false} closeOnEsc={false} center>
                <StarCrudModal onClose={onModalClose} />
            </Modal>
        </div>
    );
};