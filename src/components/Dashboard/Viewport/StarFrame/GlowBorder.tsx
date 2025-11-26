import type { CSSProperties, ReactNode } from 'react';

// CSS Modules
import styles from './GlowBorder.module.css';

type ComponentProps = {
    gap: CSSProperties['padding'];
    style: CSSProperties;
    radius: CSSProperties['borderRadius'];
    children?: ReactNode;
    className?: string;
    ringSize: number;
    glowSize: number;
};

export const GlowBorder = ({
    gap,
    style,
    radius,
    children,
    ringSize,
    glowSize,
    className = '',
}: ComponentProps) => {
    return (
        <div
            style={{ 
                ...style,
                padding: gap,
                boxShadow: `0 0 0 ${ringSize}px, 0 0 ${glowSize / 2}px 0, 0 0 ${glowSize}px 0`,
                borderRadius: radius,
            }}
            className={styles.circle + ' ' + className}
        >
            {children}
        </div>
    );
};