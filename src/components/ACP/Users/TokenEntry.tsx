import { PiKeyDuotone } from 'react-icons/pi';

type ComponentProps = {
    token: string;
};

export const TokenEntry = ({ token }: ComponentProps) => (
    <div className="flex flex-1/3 h-20 p-2 grow-0 border-8 border-gray-800 overflow-hidden">
        <span className="w-14 flex grow-0 items-center justify-center bg-gray-600 text-gray-100 rounded-sm">
            <PiKeyDuotone size={28} />
        </span>

        <div className="flex flex-1 items-center justify-center font-bold text-2xl">
            {token.toUpperCase()}
        </div>
    </div>
);