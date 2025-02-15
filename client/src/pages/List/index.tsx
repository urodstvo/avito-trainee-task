import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useGetItemsQuery } from '@/api/queries';
import { useTitle } from '@/lib/hooks';
import { ItemList } from './item-card';

import { ItemsPagination } from './pagination';
import { Filter } from './filter';
import { Item } from '@/api';

const ITEMS_PER_PAGE = 5;

const getFilteredData = (
    items: Item[],
    page: number,
    filters: {
        name: string | null;
        location: string | null;
        type: string | null;
        propertyType: string | null;
        area: string | null;
        rooms: string | null;
        price: string | null;
        brand: string | null;
        model: string | null;
        year: string | null;
        serviceType: string | null;
        experience: string | null;
        cost: string | null;
    }
) => {
    const filteredItems = items.filter((item) => {
        return (
            (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.type || item.type === filters.type) &&
            // Фильтр недвижимости
            (!filters.propertyType || (item.type === 'Недвижимость' && item.propertyType === filters.propertyType)) &&
            (!filters.area || (item.type === 'Недвижимость' && item.area === Number(filters.area))) &&
            (!filters.rooms || (item.type === 'Недвижимость' && item.rooms === Number(filters.rooms))) &&
            (!filters.price || (item.type === 'Недвижимость' && item.price <= Number(filters.price))) &&
            // Фильтр автомобилей
            (!filters.brand ||
                (item.type === 'Авто' && item.brand.toLowerCase().includes(filters.brand.toLowerCase()))) &&
            (!filters.model ||
                (item.type === 'Авто' && item.model.toLowerCase().includes(filters.model.toLowerCase()))) &&
            (!filters.year || (item.type === 'Авто' && item.year === Number(filters.year))) &&
            // Фильтр услуг
            (!filters.serviceType || (item.type === 'Услуги' && item.serviceType === filters.serviceType)) &&
            (!filters.experience || (item.type === 'Услуги' && item.experience === Number(filters.experience))) &&
            (!filters.cost || (item.type === 'Услуги' && item.cost <= Number(filters.cost)))
        );
    });

    return {
        items: filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
        totalPages: Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
    };
};

export const getCountTitle = (count: number) => {
    let title = `${count} `;

    if (count % 10 === 1 && count % 100 !== 11) {
        title += 'объявление';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        title += 'объявления';
    } else {
        title += 'объявлений';
    }

    return title;
};

export const ListPage = () => {
    useTitle('Список объявлений');
    const [searchParams, setSearchParams] = useSearchParams();

    const { data } = useGetItemsQuery();

    const page = Number(searchParams.get('page')) || 1;

    const { items, totalPages } = useMemo(
        () =>
            getFilteredData(data || [], page, {
                name: searchParams.get('name'),
                location: searchParams.get('loc'),
                type: searchParams.get('type'),
                propertyType: searchParams.get('propertyType'),
                area: searchParams.get('area'),
                rooms: searchParams.get('rooms'),
                price: searchParams.get('price'),
                brand: searchParams.get('brand'),
                model: searchParams.get('model'),
                year: searchParams.get('year'),
                serviceType: searchParams.get('serviceType'),
                experience: searchParams.get('expierence'),
                cost: searchParams.get('cost'),
            }),
        [data, page, searchParams]
    );

    useEffect(() => {
        if (totalPages > 0 && page > totalPages) setSearchParams({ page: String(totalPages) });
    }, [page, totalPages]);

    return (
        <div className='flex flex-col w-full justify-between pb-20'>
            <div className='flex gap-5'>
                <Filter />
                <div className='flex flex-col gap-5 flex-1'>
                    <h3>{getCountTitle(items.length)}</h3>
                    <ItemList items={items || []} />
                </div>
            </div>
            <ItemsPagination page={page} totalPages={totalPages} />
        </div>
    );
};
