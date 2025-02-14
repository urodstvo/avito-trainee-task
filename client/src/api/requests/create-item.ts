import { createRequestWithAuthHeader, type Item, PoorItem } from '@/api';

export const createItemRequest = async (data: PoorItem) => {
    const request = createRequestWithAuthHeader('/items', {
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

    return (await response.json()) as Item;
};
