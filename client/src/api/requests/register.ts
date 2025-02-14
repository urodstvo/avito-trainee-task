import { createRequestWithAuthHeader } from '@/api';

type RegisterResponse = {
    access_token: string;
};

export const registerRequest = async (data: { username: string; password: string }) => {
    const request = createRequestWithAuthHeader('/register', {
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

    return (await response.json()) as RegisterResponse;
};
