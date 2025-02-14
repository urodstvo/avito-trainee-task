export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const createRequestWithAuthHeader = (url_path: string, options: RequestInit = {}) => {
    options.headers = {
        ...options.headers,
        ...(localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}),
    };
    return () => fetch(`${API_URL}${url_path}`, options);
};

export * from './types';
