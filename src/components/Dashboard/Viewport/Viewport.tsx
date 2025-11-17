
// State
import { useAppSelector } from 'src/state/store';

export const Viewport = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    return (
        <div className="flex p-3 justify-center items-center select-none">
            {backendState.stage}
        </div>
    )
}