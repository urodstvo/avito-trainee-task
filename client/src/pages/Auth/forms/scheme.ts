import { z } from 'zod';

export const loginScheme = z.object({
    username: z.string({ required_error: 'Поле обязательно' }).min(1),
    password: z.string({ required_error: 'Поле обязательно' }).min(1),
});

export const registerScheme = z
    .object({
        username: z.string({ required_error: 'Поле обязательно' }).min(1, 'Поле обязательно'),
        password: z.string({ required_error: 'Поле обязательно' }).min(1, 'Поле обязательно'),
        repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: 'Пароли не совпадают',
        path: ['repeatPassword'],
    });
