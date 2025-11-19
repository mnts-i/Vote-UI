import { memo } from 'react';

// Types
import type { Star } from 'src/types';

// Components
import { GlowBorder } from './GlowBorder';

type ComponentProps = {
    star: Star;
};

const BASE_URL = import.meta.env.DEV ? `http://${window.location.hostname}:54400/images` : '/images';

export const StarFrame = memo(({ star }: ComponentProps) => {
    const nameInitials = star.name.split(/\s+/).map(s => s[0]).join('');

    return (
        <GlowBorder style={{ color: star.color ?? 'red' }}>
            {!star.image && (
                <div className="avatar avatar-placeholder w-full">
                    <div className="bg-neutral text-neutral-content w-full rounded-full">
                        <span className="text-3xl">{nameInitials}</span>
                    </div>
                </div>
            )}

            {star.image && (
                <div className="avatar w-full">
                    <div className="w-full rounded-full">
                        <img src={`${BASE_URL}/${star.image}`} />
                    </div>
                </div>
            )}
        </GlowBorder>
    );
});