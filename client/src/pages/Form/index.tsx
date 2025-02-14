import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { TypeProvider, useTypeContext } from './context';
import { PrimaryForm } from './stages/primary-form';
import { AutoForm } from './stages/auto-form';
import { EstateForm } from './stages/estate-form';
import { ServiceForm } from './stages/service-form';
import { schema } from './schema';

import { useFormPersist, useTitle } from '@/lib/hooks';
import { useCreateItemMutation, useGetItemQuery, useUpdateItemMutation } from '@/api/queries';
import { PoorItem } from '@/api';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export const FormPage = () => {
    useTitle('Размещение объявлений');
    const [searchParams] = useSearchParams();
    const isEditing = useMemo(() => {
        const editingValue = searchParams.get('editing');
        return editingValue !== null && !Number.isNaN(Number(editingValue));
    }, [searchParams]);

    const { mutateAsync: createItemAsync, isPending: isCreatePending } = useCreateItemMutation();
    const { mutateAsync: updateItemAsync, isPending: isUpdatePending } = useUpdateItemMutation(
        Number(searchParams.get('editing'))
    );
    const { data, isPending: isGetItemPending } = useGetItemQuery(Number(searchParams.get('editing')), !isEditing);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });

    useFormPersist('item-form', {
        watch: form.watch,
        setValue: form.setValue,
    });

    useEffect(() => {
        if (data) {
            form.reset(data);
        }
    }, [data]);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        if (!isEditing) {
            await createItemAsync(data as PoorItem);
            form.reset();
        } else {
            await updateItemAsync(data as PoorItem);
        }
    };

    if (isEditing && isGetItemPending) return null;

    return (
        <TypeProvider>
            <div className='lg:px-[300px] w-full flex flex-col items-center'>
                <h1 className='w-full scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                    Размещение объявления
                </h1>
                <div className='flex flex-col lg:flex-row items-start gap-5 lg:gap-[300px] pt-10'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                            <div className='flex gap-20'>
                                <PrimaryForm control={form.control} setValue={form.setValue} />
                                <div className='flex flex-col justify-between'>
                                    <SecondaryForm control={form.control} setValue={form.setValue} />
                                    <Button
                                        type='submit'
                                        className={cn('mt-5', {
                                            hidden: !form.getValues('type'),
                                        })}
                                        disabled={
                                            form.formState.isSubmitting ||
                                            !form.formState.isValid ||
                                            isCreatePending ||
                                            isUpdatePending
                                        }
                                    >
                                        {isEditing ? 'Сохранить' : 'Создать объявление'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </TypeProvider>
    );
};

const SecondaryForm = ({
    control,
    setValue,
}: {
    control: UseFormReturn<z.infer<typeof schema>, any, undefined>['control'];
    setValue: UseFormReturn<z.infer<typeof schema>, any, undefined>['setValue'];
}) => {
    const type = useTypeContext();

    if (type === 'Авто') return <AutoForm control={control} setValue={setValue} />;
    if (type === 'Недвижимость') return <EstateForm control={control} setValue={setValue} />;
    if (type === 'Услуги') return <ServiceForm control={control} setValue={setValue} />;

    return null;
};
