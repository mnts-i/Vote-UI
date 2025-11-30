import { memo } from 'react';

// Types
import type { Results } from 'src/types';

// Components
import { StarFrame } from '../StarFrame';

type ComponentProps = {
    entry: Results['stars'][number];
    position: number;
};

export const ResultEntry = memo(({ entry, position }: ComponentProps) => {

    return (
        <div className="flex flex-col gap-4 p-3 aspect-square items-center justify-center relative bg-gray-900/80 rounded-xs overflow-hidden">
            <div className="flex items-center justify-center w-6 aspect-square bg-primary/16 rounded-sm absolute left-1.5 top-1.5">
                <span className="font-[Spicy_Sale] text-xs text-center text-primary">
                    {position + 1}
                </span>
            </div>

            <StarFrame
                gap={2}
                radius={999}
                star={entry}
                ringSize={1}
                glowSize={12}
                fontSize={10}
                dimension={60}
            />

            <div className="flex flex-col items-center justify-center overflow-hidden">
                <span className="flex-auto font-bold text-sm text-gray-200 truncate overflow-hidden">
                    {entry.name}
                </span>

                {entry.field && (
                    <span className="text-xs text-gray-500 truncate overflow-hidden">
                        {entry.field}
                    </span>
                )}
            </div>
        </div>
    );
});