import Lottie from 'lottie-react';

// Lottie
import starLottie from './ViewIdle/star.json';

// State
import { useAppSelector } from 'src/state/store';

// Components
import CurvedLoop from './ViewIdle/CurvedLoop';

export const ViewIdle = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'IDLE') {
        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="aspect-square h-80 -mt-10">
                <Lottie
                    animationData={starLottie}
                    loop={false}
                    autoplay
                />
            </div>

            <div className="flex items-center w-full h-40 -mt-16">
                <CurvedLoop
                    marqueeText="Καλωσηρθεσ ✦ Talent Show ✦ Γυμνασιο Ποδοχωριου ✦"
                    speed={2}
                    curveAmount={400}
                    interactive={false}
                />
            </div>
        </div>
    );
};  