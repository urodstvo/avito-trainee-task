import { Link } from 'react-router';

export const Error404Page = () => {
    return (
        <>
            <h1>Страница не найдена</h1>
            <Link to='/'>Вернуться к списку объявлений</Link>
        </>
    );
};
