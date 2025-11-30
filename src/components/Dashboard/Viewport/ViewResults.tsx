import { Flipper, Flipped } from 'react-flip-toolkit';

// State
import { useAppSelector } from 'src/state/store';

// Components
import { ResultEntry } from './ViewResults/ResultEntry';

export const ViewResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'RESULTS') {
        return null;
    }

    const maxScore = backendState.biggestShrunk;

    return (
        <div className="flex-auto flex flex-col gap-2 -my-5">
            {backendState.finished && (
                <div className="flex gap-2">
                    COMPLETE!
                </div>
            )}

            {/* <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] relative">
                {gridBoxes}
                {entries}
            </div> */}

            <Flipper
                flipKey={backendState.stars.map(s => s.id).join(',')}
            >
                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] relative">
                    {backendState.stars.map((entry, idx) => (
                        <Flipped flipId={'star_' + entry.id} key={entry.id}>
                            <ResultEntry
                                entry={entry}
                                position={idx}
                            />
                        </Flipped>
                    ))}
                </div>
            </Flipper>
        </div>
    );
};