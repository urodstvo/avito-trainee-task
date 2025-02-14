import { createRequestWithAuthHeader } from '@/api';

export const logoutRequest = async () => {
    const request = createRequestWithAuthHeader('/logout', {
        method: 'POST',
    });

    const response = await request();
    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    return;
};
