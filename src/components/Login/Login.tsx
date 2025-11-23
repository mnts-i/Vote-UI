import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

// State
import { useLoginMutation } from 'src/state/api/appApi';

// Shared
import { glassStyles } from 'src/shared';

// Components
import { Animation } from './Animation';

type FormInput = {
    token: string;
};

export const Login = () => {
    const navigate = useNavigate();

    const [doLogin, { data, isSuccess, isLoading }] = useLoginMutation();

    const {
        register,
        formState,
        handleSubmit,
    } = useForm<FormInput>({
        mode: 'all'
    });

    const onSubmit = (data: FormInput) => {
        if (!isLoading) {
            doLogin(data.token);
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            localStorage.setItem('t', data.token);
            navigate('/');
        }
    }, [data, isSuccess]);

    return (
        <div className="flex p-5 w-full h-full justify-center items-center overflow-hidden">

            {/* CARD */}
            <div
                style={glassStyles}
                className="card card-md portrait:gap-2 landscape:gap-7 portrait:p-8 landscape:p-4 rounded-sm! relative landscape:flex-row landscape:items-center"
            >

                {/* ANIMATION */}
                <div className="flex flex-auto grow shrink justify-center items-center">
                    <Animation />
                </div>

                {/* CONTROLS */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="portrait:flex-0 landscape:flex-auto flex flex-col gap-3"
                >
                    <label className="input input-lg w-auto">
                        <span className="text-gray-400 text-base">
                            Κλειδί
                        </span>

                        <input
                            type="password"
                            maxLength={11}
                            className="grow uppercase text-center"
                            autoComplete="off"
                            autoFocus
                            {...register('token', { maxLength: 11, minLength: 11, required: true })}
                        />
                    </label>

                    <button
                        disabled={!formState.isValid || isLoading}
                        className={classNames('btn btn-lg btn-soft btn-primary', {
                            'btn-disabled': !formState.isValid || isLoading
                        })}
                    >
                        {isLoading && (
                            <span className="loading loading-spinner"></span>
                        )}

                        Είσοδος
                    </button>
                </form>
            </div>
        </div >
    );
};