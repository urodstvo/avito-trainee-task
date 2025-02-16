import { useTitle } from '@/lib/hooks';

import { RegisterForm } from './forms/register-form';
import { LoginForm } from './forms/login-form';

export const LoginPage = () => {
    useTitle('Авторизация');
    return (
        <main className='w-full h-full flex justify-center '>
            <div className='flex flex-col items-center w-full md:px-[200px] xl:px-[300px]'>
                <h1 className='w-full scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Авторизация</h1>
                <div className='mt-10 w-full lg:px-[50px]'>
                    <LoginForm />
                </div>
            </div>
        </main>
    );
};

export const RegisterPage = () => {
    useTitle('Регистрация');
    return (
        <main className='w-full h-full flex justify-center '>
            <div className='flex flex-col items-center w-full md:px-[200px] xl:px-[300px]'>
                <h1 className='w-full scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Регистрация</h1>
                <div className='mt-10 w-full lg:px-[50px]'>
                    <RegisterForm />
                </div>
            </div>
        </main>
    );
};
