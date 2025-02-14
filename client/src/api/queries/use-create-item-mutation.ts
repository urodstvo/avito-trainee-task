import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PoorItem } from '@/api';
import { createItemRequest } from '@/api/requests';
import { toast } from 'sonner';

export const useCreateItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PoorItem) => createItemRequest(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items'],
            });
            toast.info('Объявление создано.');
        },
        onError: (error) => {
            if (error.message === '500') {
                toast.error('На сервере произошла ошибка.', {
                    description: 'Попробуйте позже',
                });
            }
            if (error.message === '400') {
                toast.error('Ошибка при создании объявления.', {
                    description: 'Возможно неправильно заполнены поля.',
                });
            }
        },
    });
};
