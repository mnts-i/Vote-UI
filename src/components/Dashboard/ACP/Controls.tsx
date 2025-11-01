
// Shared
import { glassStyles } from 'src/shared';

const tabCls = "h-12 flex flex-auto items-center justify-center";

export const AcpControls = () => {
    return (
        <div
            className="flex justify-between flex-nowrap"
            style={{
                ...glassStyles,
                border: 'none',
                borderRadius: 0,
            }}
        >
            <div className={tabCls}>
                <span>
                First
                </span>
            </div>

            <div className={tabCls}>
                Second
            </div>

            <div className={tabCls}>
                Thrid
            </div>
        </div>
    );
};