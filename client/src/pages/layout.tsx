import { Outlet } from 'react-router';

export const Layout = () => {
    return (
        <>
            <header>header</header>
            <Outlet />
        </>
    );
};
