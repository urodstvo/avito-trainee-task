import { useQuery } from '@tanstack/react-query';
import { getMeRequest } from '@/api/requests';

export const useGetMeQuery = () =>
    useQuery({
        queryKey: ['get-me'],
        queryFn: () => getMeRequest(),
        staleTime: 1000 * 60,
    });
