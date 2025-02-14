import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PoorItem } from '@/api';
import { updateItemRequest } from '@/api/requests';
import { toast } from 'sonner';

export const useUpdateItemMutation = (id: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PoorItem) => updateItemRequest(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items', id],
            });
            toast.info('Объявление обновлено.');
        },
        onError: (error) => {
            if (error.message === '500') {
                toast.error('На сервере произошла ошибка.', {
                    description: 'Попробуйте позже',
                });
            }
            if (error.message === '404') {
                toast.error('Такого объявления не существует.');
            }
            if (error.message === '403') {
                toast.error('У вас недостаточно прав для изменения объявления.');
            }
        },
    });
};
