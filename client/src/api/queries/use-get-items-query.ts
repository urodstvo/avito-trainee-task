import { useQuery } from '@tanstack/react-query';
import { getItemsRequest } from '@/api/requests';

export const useGetItemsQuery = () =>
    useQuery({
        queryKey: ['items'],
        queryFn: () => getItemsRequest(),
        staleTime: 1000 * 60,
    });
