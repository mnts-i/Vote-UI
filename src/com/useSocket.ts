import { useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    const socket = useMemo(() => io(''), []);

    return socket;
}