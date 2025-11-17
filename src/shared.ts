import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const glassBgValue = 200;

export const glassStyles = {
    background: `rgba(${glassBgValue}, ${glassBgValue}, ${glassBgValue}, 0.06)`,
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
    border: `1px solid rgba(${glassBgValue * .8}, ${glassBgValue * .8}, ${glassBgValue * .8}, 0.1)`,
};

export const dateDiff = (date: string) => {
    const diff = dayjs().diff(dayjs(date), 'seconds');
    const d = dayjs.duration(diff, 'seconds');

    const m = d.minutes();
    const s = d.seconds();

    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}