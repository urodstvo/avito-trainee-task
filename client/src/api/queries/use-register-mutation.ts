import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerRequest } from '@/api/requests';
import { toast } from 'sonner';

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { username: string; password: string }) => registerRequest(data),
        onSuccess: (data) => {
            window.localStorage.setItem('token', data.access_token);
            queryClient.invalidateQueries({
                queryKey: ['get-me'],
            });
            toast.info('Вы успешно вошли в систему.');
        },
        onError: (error) => {
            if (error.message === '500') {
                toast.error('На сервере произошла ошибка.', {
                    description: 'Попробуйте позже',
                });
            }
            if (error.message === '400') {
                toast.error('Такой пользователь уже существует');
            }
        },
    });
};
