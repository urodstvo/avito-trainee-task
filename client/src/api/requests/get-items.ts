import { createRequestWithAuthHeader, Item } from '@/api';

export const getItemsRequest = async () => {
    const request = createRequestWithAuthHeader('/items');

    const response = await request();
    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    return (await response.json()) as Item[];
};
