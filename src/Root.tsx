import dayjs from 'dayjs';
import classNames from 'classnames';
import { Outlet } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import toast, { Toaster, resolveValue } from 'react-hot-toast';

// DayJS locale
import 'dayjs/locale/el';
dayjs.locale('el');

// Tailwind + Daisy UI
import './assets/tailwind.css';

// Animate.css
import 'animate.css';

// React-responsive-modal CSS
import 'react-responsive-modal/styles.css';

// Application CSS
import './assets/app.css';

// Components
import { Background } from './components/Background';
import { glassStyles } from './shared';

export const Root = () => {
    return (
        <div className="flex flex-col w-dvw h-dvh overflow-x-hidden relative z-30">
            <div className="fixed w-dvw h-dvh -z-10">
                <Background
                    particleCount={400}
                    particleBaseSize={200}
                    alphaParticles
                />
            </div>

            <ErrorBoundary fallbackRender={({ error }) => (
                <div className="p-4 bg-red-500/20 text-red-800">
                    {error.message}
                </div>
            )}>
                <Outlet />
            </ErrorBoundary>

            <Toaster
                toastOptions={{
                    duration: 2000,
                }}
            >
                {(t) => (
                    <div
                        className={classNames('flex gap-2.5 items-center animate__animated animate__faster', {
                            'animate__fadeInDown': !t.dismissed,
                            'animate__fadeOutUp': t.dismissed,
                        })}
                        style={{
                            ...glassStyles,
                            padding: '10px 18px',
                            borderRadius: '100px',
                            color: '#fff',
                        }}
                        onClick={() => toast.dismiss(t.id)}
                    >
                        {t.icon && (<span>{t.icon}</span>)}

                        <span className="text-sm">
                            {resolveValue(t.message, t)}
                        </span>
                    </div>
                )}
            </Toaster>
        </div>
    );
};