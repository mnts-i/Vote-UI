
// State
import { useAppSelector } from 'src/state/store';
import ElectricBorder from './ElectricBorder';

export const ViewIdle = () => {
    const backendState = useAppSelector(state => state.app.backendState);

    if (backendState.stage !== 'IDLE') {
        return null;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center">
            <ElectricBorder
                color="#7df9ff"
                speed={2}
                chaos={0.3}
                thickness={4}
                className="w-5/6 max-w-60 aspect-square rounded-3xl!"
            >
                <div>
                    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
                        A glowing
                    </p>
                </div>

            </ElectricBorder>
        </div>
    );
};