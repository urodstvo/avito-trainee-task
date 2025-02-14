import { NavLink, Outlet } from 'react-router';
import { useIsAuthenticated } from '@/auth';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/api/queries';

export const Layout = () => {
    const isAuthenticated = useIsAuthenticated();
    const { mutate } = useLogoutMutation();

    return (
        <div className='flex flex-col min-h-screen'>
            <header className='flex items-center justify-between px-10 py-5'>
                <NavLink className='font-extrabold text-xl text-primary' to='/'>
                    AVITO CLONE
                </NavLink>
                <nav className='flex items-center gap-4'>
                    {isAuthenticated ? (
                        <>
                            <Button asChild>
                                <NavLink to='/form'>Разместить объявление</NavLink>
                            </Button>
                            <Button variant='secondary' className='cursor-pointer' onClick={() => mutate()}>
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button asChild>
                            <NavLink to='/login'>Войти</NavLink>
                        </Button>
                    )}
                </nav>
            </header>
            <div className='px-10 flex flex-1'>
                <Outlet />
            </div>
        </div>
    );
};
