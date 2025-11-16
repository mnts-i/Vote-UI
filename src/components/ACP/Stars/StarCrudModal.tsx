import toast from 'react-hot-toast';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';

// State
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
    const [fetchStar, { data: loadedStar, isFetching: fetching, isError: fetchFailed }] = useLazyFetchStarQuery();

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
            className="w-[70dvw] max-w-sm flex flex-col gap-1 overflow-hidden"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            {fetching && (
                <div
                    className="flex flex-col gap-4 items-center justify-center absolute top-0 bottom-0 left-0 right-0 bg-slate-500/20 backdrop-blur-[2px] z-50 select-none"
                >
                    <div className="loading loading-spinner loading-xl text-primary" />

                    <span className="text-sm text-slate-300 py-2 px-5 bg-slate-600/50 rounded-md">
                        Φόρτωση ταλέντου...
                    </span>
                </div>
            )}

            <h3 className="font-bold text-lg pb-2">
                {editMode ? 'Επεξεργασία' : 'Δημιουργία'} ταλέντου
            </h3>

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

                {editMode ? 'Αποθήκευση Αλλαγών' : 'Δημιουργία'}
            </button>
        </form>
    );
};