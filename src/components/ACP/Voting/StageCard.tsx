import classNames from 'classnames';
import type { ReactNode } from 'react';

type ComponentProps = {
    title: string;
    selected?: boolean;
    description?: string;
    onClick?: () => void;
    children?: ReactNode;
};

const stageCardCls = 'flex flex-col gap-1 py-3 px-4 bg-gray-700/50 text-gray-300 cursor-pointer select-none rounded-sm first-of-type:rounded-t-xl last-of-type:rounded-b-xl';
const selectedStageCls = 'bg-blue-400/25! text-blue-300! ring-2 ring-blue-500';

export const StageCard = ({
    title,
    selected = false,
    description,
    onClick,
    children,
}: ComponentProps) => {
    const onCardClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            onClick={onCardClick}
            className={classNames(stageCardCls, {
                [selectedStageCls]: selected
            })}
        >
            <span className="font-bold text-sm">
                {title}
            </span>

            {description && (
                <span className="text-xs">
                    {description}
                </span>
            )}

            {children}
        </div>
    );
};