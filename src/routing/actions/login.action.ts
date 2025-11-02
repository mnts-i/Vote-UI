import toast from 'react-hot-toast';
import { redirect, type ActionFunction } from 'react-router';

// HTTP
import { http } from 'src/com/http';

export const loginAction: ActionFunction = async (args) => {
    try {
        const formData = await args.request.formData();
        const token = formData.get('token') as string ?? '';
        
        await http.post('/users/login', { token });

        localStorage.setItem('t', token);

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