import classNames from 'classnames';
import { PiStarFill } from 'react-icons/pi';
import { memo, useEffect, useRef } from 'react';

// CSS Module
import styles from './ResultEntry.module.css';

// Types
import type { Results } from 'src/types';

// Components
import { StarFrame } from '../StarFrame';

type ComponentProps = {
    entry: Results['stars'][number];
    finished: boolean;
    position: number;
};

const flyStar = (target: HTMLElement) => {
    const star = document.createElement('div');
    star.className = styles.star;
    star.textContent = '⭐';

    document.body.appendChild(star);

    // random starting point
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() > .5 ? window.innerHeight : 0;

    const rect = target.getBoundingClientRect();
    const endX = rect.left + rect.width / 2;
    const endY = rect.top + rect.height / 2;

    star.style.left = startX + "px";
    star.style.top = startY + "px";

    star.animate(
        [
            { transform: `translate(0px, 0px)`, opacity: 1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0.3)`, opacity: 0 }
        ],
        { duration: Math.random() * 400 + 1200, easing: 'ease-out' }
    ).onfinish = () => {
        star.remove();

        if (!target.hasAttribute('anim') && Math.random() > .4) {
            target.setAttribute('anim', '1');

            target.animate([
                { filter: 'brightness(100%)' },
                { filter: 'brightness(150%)' },
                { filter: 'brightness(100%)' },
            ], { duration: 200 }).onfinish = () => target.removeAttribute('anim');
        }
    };
};

export const ResultEntry = memo(({ entry, finished, position }: ComponentProps) => {
    const divRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (!entry.animating) { return; }

        const interval = setInterval(() => {
            flyStar(divRef.current);
        }, Math.random() * 60 + 40);

        return () => { clearInterval(interval); };
    }, [entry.animating]);

    useEffect(() => {
        if (!entry.animating) {
            return divRef.current.classList.remove(styles.animated);
        }

        const timeout = setTimeout(() => {
            divRef.current.classList.add(styles.animated);
        }, Math.random() * 600);

        return () => {
            clearTimeout(timeout);
        };
    }, [entry.animating]);

    const visibleScore = entry.visibleScore / 2;

    return (
        <div
            className={classNames('relative rounded-xs overflow-hidden', {
                [styles.gold]: finished && position === 0,
                [styles.silver]: finished && position === 1,
                [styles.bronze]: finished && position === 2,
            })}
        >
            <div
                ref={divRef}
                className="m-1 flex flex-col gap-0 p-1 aspect-square relative bg-gray-900 rounded-xs overflow-hidden"
                style={{
                    zIndex: 20 + position,
                }}
            >
                <div className="flex items-center justify-center w-6 aspect-square bg-primary/16 rounded-sm absolute left-1.5 top-1.5">
                    <span className="font-[Spicy_Sale] text-xs text-center text-primary">
                        {position + 1}
                    </span>
                </div>

                <div className="flex-auto flex items-center justify-center">
                    <StarFrame
                        gap={2}
                        radius={999}
                        star={entry}
                        ringSize={2}
                        glowSize={20}
                        fontSize={10}
                        dimension={64}
                    />
                </div>

                <div className="grow-0 h-[50px] flex flex-col gap-0.5 font-bold items-center justify-center bg-gray-950/50 rounded-sm">
                    <div className="flex flex-col items-center justify-center overflow-hidden">
                        <span className="flex-auto text-sm text-gray-200 truncate overflow-hidden">
                            {entry.name}
                        </span>
                    </div>

                    <div className="flex gap-1.5 items-center justify-center text-xs">
                        <div className="text-amber-200/80">
                            <PiStarFill />
                        </div>

                        <span className="text-amber-100">
                            {Number.isInteger(visibleScore) ? visibleScore : visibleScore.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
});