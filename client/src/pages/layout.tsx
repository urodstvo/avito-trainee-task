import { NavLink, Outlet } from 'react-router';
import { useIsAuthenticated } from '@/auth';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/api/queries';
import { cn } from '@/lib/utils';

export const Layout = () => {
    const isAuthenticated = useIsAuthenticated();
    const { mutate } = useLogoutMutation();

    return (
        <div className='flex flex-col min-h-screen'>
            <header
                className={cn('flex justify-between px-2 py-2 lg:px-10 lg:py-5 gap-2', {
                    'flex-col md:flex-row items-start': isAuthenticated,
                    'items-center': !isAuthenticated,
                })}
            >
                <NavLink className='font-extrabold text-xl text-primary' to='/'>
                    AVITO CLONE
                </NavLink>
                <nav className='flex items-center gap-4 w-full justify-between md:w-fit'>
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
            <div className='px-2 lg:px-10 flex flex-1'>
                <Outlet />
            </div>
        </div>
    );
};
