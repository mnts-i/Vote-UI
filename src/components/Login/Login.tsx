import { FormProvider, useForm } from 'react-hook-form';

// Components
import { Animation } from './Animation';
import { Controls } from './Controls';
import LiquidEther from './Animation/Background';

type FormInput = {
    token: string;
};

const bgValue = 200;

export const Login = () => {
    const form = useForm<FormInput>({
        mode: 'all'
    });

    return (
        <div className="flex p-5 w-full h-full justify-center items-center overflow-hidden">
            <div className="fixed w-[100dvw] h-[100dvh]">
                <LiquidEther />
            </div>

            {/* CARD */}
            <div className="card card-md portrait:gap-2 landscape:gap-7 portrait:p-8 landscape:p-4 rounded-sm! relative landscape:flex-row landscape:items-center" style={{
                background: `rgba(${bgValue}, ${bgValue}, ${bgValue}, 0.06)`,
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(8px)',
                border: `1px solid rgba(${bgValue * .8}, ${bgValue * .8}, ${bgValue * .8}, 0.1)`,
            }}>

                {/* ANIMATION */}
                <div className="flex flex-auto grow shrink justify-center items-center">
                    <Animation />
                </div>

                {/* CONTROLS */}
                <FormProvider {...form}>
                    <form className="portrait:flex-0 landscape:flex-auto flex flex-col gap-3">
                        <Controls />
                    </form>
                </FormProvider>
            </div>
        </div >
    );
};