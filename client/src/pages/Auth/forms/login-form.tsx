import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginScheme } from './scheme';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormPersist } from '@/lib/hooks';
import { useLoginMutation } from '@/api/queries/use-login-mutation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const LoginForm = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginScheme>>({
        resolver: zodResolver(loginScheme),
        mode: 'onSubmit',
    });

    useFormPersist('login-form', {
        watch: form.watch,
        setValue: form.setValue,
    });

    const { mutate, isPending, isSuccess } = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);

    function onSubmit(values: z.infer<typeof loginScheme>) {
        mutate({
            username: values.username.trim(),
            password: values.password.trim(),
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя пользователя</FormLabel>
                            <FormControl>
                                <Input placeholder='Username' {...field} autoComplete='username' />
                            </FormControl>
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
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    className='w-full cursor-pointer mt-10'
                    disabled={form.formState.isSubmitting || isPending}
                >
                    Авторизоваться
                </Button>
            </form>
        </Form>
    );
};
