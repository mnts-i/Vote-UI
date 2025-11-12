import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateStarMutation, useLazyFetchStarQuery, useUpdateStarMutation } from 'src/state/api/appApi';

// Types
import type { Star } from 'src/types';

type FormInput = {
    name: string;
    field: string;
    color: string;
};

type ComponentProps = {
    id?: number;
    onClose: () => void,
};

export const StarCrudModal = ({ id, onClose }: ComponentProps) => {
    const editMode = id !== undefined;

    const {
        register,
        formState,
        setValue,
        handleSubmit,
    } = useForm<FormInput>({
        mode: 'all'
    });

    const [update, { isLoading: updating, isSuccess: updated }] = useUpdateStarMutation();
    const [create, { isLoading: creating, isSuccess: created }] = useCreateStarMutation();
    const [fetchStar, { data: loadedStar, isSuccess: fetched, isFetching: fetching, isError: fetchFailed }] = useLazyFetchStarQuery();

    const isProcessing = fetching || creating || updating;

    const onSubmit = (data: FormInput) => {
        if (!isProcessing) {
            editMode ? update({ id, ...data }) : create(data);
        }
    };

    // Fetch star if not in edit mode
    useEffect(() => {
        if (typeof id === 'number') { fetchStar(id, false); }
    }, []);

    // Update fields on star load
    useEffect(() => {
        if (loadedStar) {
            setValue('name', loadedStar.name);
            setValue('field', loadedStar.field ?? '');
            setValue('color', loadedStar.color ?? '');
        }
    }, [setValue, loadedStar]);

    // Close on fetch failure
    useEffect(() => {
        if (fetchFailed) { onClose(); }
    }, [fetchFailed, onClose]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Ονομασία Ταλέντου</legend>
                <input
                    type="text"
                    className="input"
                    {...register('name', { minLength: 1, required: true })}
                />
            </fieldset>
        </form>
    );
};