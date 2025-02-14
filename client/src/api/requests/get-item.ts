import { createRequestWithAuthHeader, Item } from '@/api';

export const getItemRequest = async (id: number) => {
    const request = createRequestWithAuthHeader('/items/' + id);

    const response = await request();
    if (!response.ok) {
        throw new Error(response.status.toString());
    }

    return (await response.json()) as Item;
};
