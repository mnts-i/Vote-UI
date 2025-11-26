
// State
import { useMemo } from 'react';
import { useAppSelector } from 'src/state/store';
import { ResultEntry } from './ViewResults/ResultEntry';

export const ViewResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'RESULTS') {
        return null;
    }

    const maxScore = backendState.biggestShrunk;

    const completed = useMemo(() => backendState.stars.findIndex(s => s.state !== 'FINISHED') === -1, [backendState]);

    const currentStar = useMemo(() => backendState.stars.find(s => s.state === 'COUNTING'), [backendState]);
    const finishedStars = useMemo(() => backendState.stars.filter(s => s.state === 'FINISHED').sort((a, b) => a.shrunkScore - b.shrunkScore), [backendState]);

    return (
        <div className="flex-auto flex flex-col gap-2">
            {completed && (
                <div className="flex gap-2">
                    COMPLETE!
                </div>
            )}

            {!completed && currentStar && (
                <div>
                    {currentStar.name}
                </div>
            )}

            <div className="flex flex-col gap-1.5">
                {finishedStars.map((entry, idx) => (
                    <ResultEntry
                        key={entry.id}
                        entry={entry}
                        position={idx + 1}
                        maxScore={maxScore}
                        countDuration={backendState.countDuration}
                    />
                ))}
            </div>
        </div>
    );
};