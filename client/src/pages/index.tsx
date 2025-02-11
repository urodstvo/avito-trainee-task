import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';

import { Layout } from './layout';
import { AuthPage } from './Auth';
import { ListPage } from './List';
import { FormPage } from './Form';
import { ItemPage } from './Item';
import { Error404Page } from './404';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to='/list' />,
            },
            {
                path: '/list',
                element: <ListPage />,
            },
            {
                path: '/form',
                element: <FormPage />,
            },
            {
                path: '/item/:id',
                element: <ItemPage />,
            },
            {
                path: '/auth',
                element: <AuthPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Error404Page />,
    },
]);

export const Router = () => <RouterProvider router={router} />;
