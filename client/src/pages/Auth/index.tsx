import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from './forms/login-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTitle } from '@/lib/hooks';
import { RegisterForm } from './forms/register-form';

export const AuthPage = () => {
    return (
        <main className='w-full h-full flex justify-center'>
            <Tabs className='w-[600px] mt-20 items-center' defaultValue='login'>
                <TabsList className='w-full'>
                    <TabsTrigger value='login' className='flex-1'>
                        Авторизация
                    </TabsTrigger>
                    <TabsTrigger value='register' className='flex-1'>
                        Регистрация
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='login'>
                    <LoginCard />
                </TabsContent>
                <TabsContent value='register'>
                    <RegisterCard />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export const LoginCard = () => {
    useTitle('Авторизация');
    return (
        <Card className='w-full md:w-[600px]'>
            <CardHeader>
                <CardTitle>Авторизация</CardTitle>
                <CardDescription>Заполните форму, чтобы войти в свой аккаунт</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    );
};

export const RegisterCard = () => {
    useTitle('Регистрация');
    return (
        <Card className='w-full md:w-[600px]'>
            <CardHeader>
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>Заполните форму, чтобы зарегистрироваться в системе</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    );
};
