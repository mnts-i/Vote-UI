import { motion } from 'motion/react';

// State
import { useAppSelector } from 'src/state/store';

// Components
import { ResultEntry } from './ViewResults/ResultEntry';

export const ViewResults = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'RESULTS') {
        return null;
    }

    return (
        <div
            className="flex-auto -my-5 grid gap-1.5 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] "
        >
            {backendState.stars.map((entry, idx) => (
                <motion.div key={entry.id} layout>
                    <ResultEntry
                        entry={entry}
                        position={idx}
                        finished={backendState.finished}
                    />
                </motion.div>
            ))}
        </div>
    );
};