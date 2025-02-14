import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerScheme } from './scheme';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormPersist } from '@/lib/hooks';
import { useRegisterMutation } from '@/api/queries/use-register-mutation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const RegisterForm = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerScheme>>({
        resolver: zodResolver(registerScheme),
        mode: 'onChange',
        reValidateMode: 'onBlur',
    });

    useFormPersist('register-form', {
        watch: form.watch,
        setValue: form.setValue,
    });

    const { mutate, isPending, isSuccess } = useRegisterMutation();

    function onSubmit(values: z.infer<typeof registerScheme>) {
        mutate({
            username: values.username.trim(),
            password: values.password.trim(),
        });
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl>
                                <Input placeholder='Username' {...field} autoComplete='username' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='*************'
                                    {...field}
                                    type='password'
                                    autoComplete='current-password'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='repeatPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Повторите пароль</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='*************'
                                    {...field}
                                    type='password'
                                    autoComplete='current-password'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    className='w-full cursor-pointer mt-10'
                    disabled={isPending || form.formState.isSubmitting || !form.formState.isValid}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </Form>
    );
};
