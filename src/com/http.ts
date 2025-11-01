import axios from 'axios';

export const http = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:54400/api' : '/api',
});

http.interceptors.request.use((config) => {
    config.headers['X-JWT'] = localStorage.getItem('t') ?? '';

    return config;
});