import { useTitle } from '@/lib/hooks';
import { useParams } from 'react-router';

export const ItemPage = () => {
    const { id } = useParams();
    useTitle(`Просмотр объявления ${id}`);
    return <>item page</>;
};
