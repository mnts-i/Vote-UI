import type { CSSProperties, ReactNode } from 'react';

// CSS Modules
import styles from './GlowBorder.module.css';

type ComponentProps = {
    style: CSSProperties;
    children?: ReactNode;
    className?: string;
}

export const GlowBorder = ({ 
    children, 
    className = '',
    style, 
}: ComponentProps) => {
    return (
        <div className={styles.circle + ' ' + className} style={style}>
            {children}
        </div>
    )
}