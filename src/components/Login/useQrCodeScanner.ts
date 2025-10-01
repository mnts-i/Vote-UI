import toast from 'react-hot-toast';
import { useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export const useQrCodeScanner = () => {
    const requestScan = useCallback(async () => {
        try {
            const devices = await Html5Qrcode.getCameras();

            if (!devices || devices.length === 0) {
                return toast.error('Δε βρέθηκε κάμερα στη συσκευή', { id: 'error' });
            }

            const qrCode = new Html5Qrcode('reader');

            qrCode.start(
                devices[0].id,
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 }
                },
                (decodedText, decodedResult) => {
                    // do something when code is read
                    alert(decodedText);
                    alert(decodedResult);
                },
                (errorMessage) => {
                    // parse error, ignore it.
                });
        } catch (err) {
            toast.error(typeof err === 'string' ? err : err.message, { id: 'error' });
        }
    }, []);

    return requestScan;
};