import { memo } from 'react';

// Types
import type { Star } from 'src/types';

// Components
import ElectricBorder from './ElectricBorder';

type ComponentProps = {
    star: Star;
}

export const StarFrame = memo(() => {
    return (
        <ElectricBorder
            color="#7df9ff"
            speed={2}
            chaos={0.3}
            thickness={4}
            className="w-5/6 max-w-60 aspect-square rounded-3xl!"
        >
            <div>
                <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
                    A glowing
                </p>
            </div>

        </ElectricBorder>
    );
});