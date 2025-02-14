import { useQuery } from '@tanstack/react-query';
import { getItemRequest } from '@/api/requests';

export const useGetItemQuery = (id: number, disabled: boolean = false) =>
    useQuery({
        queryKey: ['items', id],
        queryFn: () => getItemRequest(id),
        staleTime: 1000 * 60,
        enabled: !disabled,
    });
