import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateStarMutation, useLazyFetchStarQuery, useUpdateStarMutation } from 'src/state/api/appApi';

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
        reset,
        register,
        formState,
        getValues,
        setValue,
        handleSubmit,
    } = useForm<FormInput>({
        mode: 'all',
        defaultValues: {
            name: '',
            field: '',
            color: '',
        }
    });

    const [update, { isLoading: updating, isSuccess: updated }] = useUpdateStarMutation();
    const [create, { isLoading: creating, isSuccess: created }] = useCreateStarMutation();
    const [fetchStar, { data: loadedStar, isSuccess: fetched, isFetching: fetching, isError: fetchFailed }] = useLazyFetchStarQuery();

    const isProcessing = fetching || creating || updating;

    const closeModal = useCallback(() => {
        onClose();
        reset();
    }, [onClose, reset]);

    const onFormSubmit = (data: FormInput) => {
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
        if (fetchFailed) { closeModal(); }
    }, [fetchFailed, closeModal]);

    // Show message on create / update and close modal
    useEffect(() => {
        if (created || updated) {
            const message = created
                ? 'Το ταλέντο δημιουργήθηκε επιτυχώς!'
                : 'Οι αλλαγές αποθηκεύτηκαν επιτυχώς!';

            toast(message, { id: 'acp-stars' });
            closeModal();
        }
    }, [created, updated, closeModal]);

    return (
        <form
            className="w-[70dvw] max-w-sm flex flex-col gap-1 pt-2"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Ονομασία Ταλέντου</legend>
                <input
                    type="text"
                    readOnly={isProcessing}
                    className="input w-auto"
                    {...register('name', { minLength: 1, required: true })}
                />
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Είδος</legend>
                <input
                    type="text"
                    readOnly={isProcessing}
                    className="input w-auto"
                    {...register('field')}
                />
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Χρώμα</legend>
                <input
                    type="color"
                    readOnly={isProcessing}
                    className="h-12 w-auto rounded-sm"
                    {...register('color')}
                />

                <button
                    type="button"
                    onClick={() => setValue('color', '')}
                    className="btn btn-sm btn-block btn-ghost"
                >
                    Κατάργηση χρώματος
                </button>
            </fieldset>

            <button
                disabled={!formState.isValid || isProcessing}
                className={classNames('btn btn-primary mt-2', {
                    ['btn-disabled']: !formState.isValid || isProcessing
                })}
            >
                {isProcessing && (
                    <span className="loading loading-spinner"></span>
                )}

                {editMode ? 'Αποθήκευση Αλλαγών' : 'Δημιουργία Ταλέντου'}
            </button>
        </form>
    );
};