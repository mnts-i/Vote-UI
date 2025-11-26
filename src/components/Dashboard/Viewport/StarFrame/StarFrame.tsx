import { memo, type CSSProperties } from 'react';

// Types
import type { Star } from 'src/types';

// Components
import { GlowBorder } from './GlowBorder';

type ComponentProps = {
    star: Star;
    gap?: CSSProperties['padding'];
    radius?: CSSProperties['borderRadius'],
    fontSize?: CSSProperties['fontSize'];
    dimension?: CSSProperties['width'];
    ringSize?: number,
    glowSize?: number,
};

const BASE_URL = import.meta.env.DEV ? `http://${window.location.hostname}:54400/images` : '/images';

export const StarFrame = memo(({
    star,
    gap = 4,
    radius = 99999,
    ringSize = 4,
    glowSize = 50,
    fontSize = 30,
    dimension = '100%',
}: ComponentProps) => {
    const nameInitials = star.name.split(/\s+/).map(s => s[0]).join('');

    return (
        <GlowBorder
            gap={gap}
            radius={radius}
            style={{ width: dimension, color: star.color ?? 'red' }}
            ringSize={ringSize}
            glowSize={glowSize}
        >
            {!star.image && (
                <div className="avatar avatar-placeholder w-full">
                    <div className="bg-neutral text-neutral-content w-full" style={{ borderRadius: radius }}>
                        <span style={{ fontSize }}>{nameInitials}</span>
                    </div>
                </div>
            )}

            {star.image && (
                <div className="avatar w-full">
                    <div className="w-full" style={{ borderRadius: radius }}>
                        <img src={`${BASE_URL}/${star.image}`} />
                    </div>
                </div>
            )}
        </GlowBorder>
    );
});