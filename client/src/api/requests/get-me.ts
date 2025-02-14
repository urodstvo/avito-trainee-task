import { createRequestWithAuthHeader } from '@/api';

type GetMeResponse = {
    id: number;
    username: string;
};

export const getMeRequest = async () => {
    const request = createRequestWithAuthHeader('/me');

    const response = await request();
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json()) as GetMeResponse;
};
