import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

export const Controls = () => {
    const { register, formState } = useFormContext();

    return (
        <>
            <label className="input input-lg">
                <span className="text-gray-400 text-base">
                    Κλειδί
                </span>

                <input
                    type="text"
                    maxLength={12}
                    className="grow uppercase text-center"
                    {...register('token', { maxLength: 12, minLength: 12 })}
                />
            </label>

            <button className={classNames('btn btn-lg btn-soft btn-secondary', {
                'btn-disabled': !formState.isValid
            })}>
                Είσοδος
            </button>
        </>
    );
};