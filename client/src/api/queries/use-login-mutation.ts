import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginRequest } from '@/api/requests';
import { toast } from 'sonner';

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { username: string; password: string }) => loginRequest(data),
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
            if (error.message === '401') {
                toast.error('Неправильные имя пользователя или пароль.');
            }
        },
    });
};
