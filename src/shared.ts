const glassBgValue = 200;

export const glassStyles = {
    background: `rgba(${glassBgValue}, ${glassBgValue}, ${glassBgValue}, 0.06)`,
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    border: `1px solid rgba(${glassBgValue * .8}, ${glassBgValue * .8}, ${glassBgValue * .8}, 0.1)`,
};