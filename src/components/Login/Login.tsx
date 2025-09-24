import { FormProvider, useForm } from 'react-hook-form';

// Components
import { Animation } from './Animation';
import { Controls } from './Controls';

type FormInput = {
    token: string;
};

export const Login = () => {
    const form = useForm<FormInput>({
        mode: 'all'
    });

    return (
        <div className="flex p-5 w-full h-full justify-center items-center">

            {/* CARD */}
            <div className="card card-md gap-2 p-8 card-border border-3 bg-base-100 relative">

                {/* ANIMATION */}
                <div className="flex flex-auto grow shrink justify-center items-center">
                    <Animation />
                </div>

                {/* CONTROLS */}
                <FormProvider {...form}>
                    <form className="flex-0 flex flex-col gap-3">
                        <Controls />
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};