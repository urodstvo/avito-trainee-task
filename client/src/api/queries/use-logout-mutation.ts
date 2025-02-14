import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutRequest } from '@/api/requests';
import { toast } from 'sonner';

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutRequest,
        onSuccess: async () => {
            window.localStorage.removeItem('token');
            queryClient.invalidateQueries({
                queryKey: ['get-me'],
            });
            toast.info('Вы успешно вышли из системы.');
        },
        onError: (error) => {
            if (error.message === '500') {
                toast.error('На сервере произошла ошибка.', {
                    description: 'Попробуйте позже',
                });
            }
        },
    });
};
