import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { animate } from 'animejs';
import { useEffect } from 'react';

dayjs.extend(utc);
dayjs.extend(duration);

// Types
import type { Results } from 'src/types';

// Components
import { StarFrame } from '../StarFrame';

type ComponentProps = {
    entry: Results['stars'][number];
    position: number;
    maxScore: number;
    countDuration: number;
};

const MIN_WIDTH = 20;

export const ResultEntry = ({ entry, position, maxScore, countDuration }: ComponentProps) => {
    useEffect(() => {
        const target = `star_score_${entry.id}`;
        const percent = entry.shrunkScore / maxScore;
        const targetWidth = MIN_WIDTH + percent * 100;

        const diff = dayjs().diff(entry.started, 'milliseconds');

        animate(target, {
            ease: 'inQuint',
            width: targetWidth + 'px',
            autoplay: true,
            duration: countDuration - diff,
        });
    }, []);

    return (
        <div className="flex flex-col gap-4 p-3 pb-5 relative bg-gray-900/80 rounded-xs overflow-hidden">
            <div className="flex-auto flex gap-4 items-center">
                <div className="w-9 grow-0 py-0.5 font-[Spicy_Sale] text-2xl text-center text-primary bg-primary/16 rounded-sm">
                    {position}
                </div>

                <StarFrame
                    gap={2}
                    radius={4}
                    star={entry}
                    ringSize={1}
                    glowSize={12}
                    fontSize={10}
                    dimension={40}
                />

                <div className="flex-auto flex flex-col overflow-hidden">
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

            <div className="h-2 bg-black/20 absolute bottom-0 left-0 right-0 overflow-hidden">
                <div
                    id={`star_score_${entry.id}`}
                    className="h-full w-1/2 bg-primary"
                />
            </div>
        </div>
    );
};