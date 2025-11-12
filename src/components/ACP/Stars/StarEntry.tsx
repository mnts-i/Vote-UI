
// Types
import type { Star } from 'src/types';

type ComponentProps = {
    star: Star;
};

export const StarEntry = ({ star }: ComponentProps) => {
    return (
        <div>
            {star.name}
        </div>
    );
};