import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef } from 'react';

import lottieData from './talent-search.json';

export const Animation = () => {
    const lottieRef = useRef<LottieRefCurrentProps>(null!);

    useEffect(() => {
        const anim = lottieRef.current;

        if (!anim) { return; }

        const duration = (anim.getDuration() ?? 0) * 1000;

        const id = setInterval(() => anim.goToAndPlay(0, true), duration + 2500);

        return () => { clearInterval(id); };
    }, [lottieRef]);

    return (
        <Lottie
            loop={false}
            lottieRef={lottieRef}
            animationData={lottieData}
            className="portrait:h-[280px] landscape:h-[160px]"
            autoPlay
        />
    );
};