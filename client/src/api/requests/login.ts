import { createRequestWithAuthHeader } from '@/api';

type LoginResponse = {
    access_token: string;
};

export const loginRequest = async (data: { username: string; password: string }) => {
    const request = createRequestWithAuthHeader('/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await request();
    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    return (await response.json()) as LoginResponse;
};
