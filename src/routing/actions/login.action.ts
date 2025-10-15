import toast from 'react-hot-toast';
import { redirect, type ActionFunction } from 'react-router';

// HTTP
import { http } from 'src/com/http';

export const loginAction: ActionFunction = async (args) => {
    console.log(args);

    try {
        const formData = await args.request.formData();
        const { data } = await http.post('/users/login', { token: formData.get('token') });

        localStorage.setItem('t', data);

        return redirect('/');
    } catch (err: any) {
        let message = 'Σφάλμα κατά τη σύνδεση!';

        if (typeof err?.response?.data?.message === 'string') {
            message = err.response.data.message;
        }

        toast(message, { id: 'login-failure', icon: '😢' });
        
        console.log(err);

        return redirect('/login');
    }
};