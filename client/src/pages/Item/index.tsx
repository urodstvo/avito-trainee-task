import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import { useGetItemQuery, useGetMeQuery } from '@/api/queries';
import { Button } from '@/components/ui/button';
import { useTitle } from '@/lib/hooks';
import { useQueryClient } from '@tanstack/react-query';

export const ItemPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useTitle(`Просмотр объявления ${id}`);
    const me = useGetMeQuery();
    const { data, error } = useGetItemQuery(Number(id));
    useEffect(() => {
        if (error) {
            if (error.message === '404') {
                navigate('/page-not-found');
            }
        }
    }, [error]);

    // Прерывание (отмена/прекращение) запросов при переходе со страницы на страницу
    const queryClient = useQueryClient();
    useEffect(() => {
        return () => {
            queryClient.cancelQueries({ queryKey: ['items', id] });
            queryClient.cancelQueries({ queryKey: ['get-me'] });
        };
    }, [id, queryClient]);

    return (
        <div className='flex flex-col items-center w-full'>
            <h1 className='w-full scroll-m-20 text-2xl md:text-3xl font-extrabold tracking-tight lg:text-4xl lg:px-[50px] text-end'>
                Просмотр объявления
            </h1>
            <main className='flex gap-5 lg:gap-10 w-full lg:px-[50px] xl:px-[200px] pt-5 flex-col md:flex-row items-center md:items-start'>
                <div className='size-[300px] lg:size-[400px] p-4 '>
                    <img
                        className='object-contain size-full'
                        src={data?.image ?? 'https://archive.org/download/placeholder-image/placeholder-image.jpg'}
                        alt={data?.name}
                    />
                </div>
                <div className='flex-1 flex flex-col w-full'>
                    <h3 className='scroll-m-20 text-2xl tracking-tight'>{data?.name}</h3>
                    <p className='leading-7 [&:not(:first-child)]:mt-2 text-muted-foreground'>{data?.description}</p>
                    <div className='py-5'>
                        {data?.type === 'Недвижимость' && (
                            <>
                                <div className='flex justify-between pb-1'>
                                    <span>Тип недвижимости</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.propertyType}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>
                                        Площадь, м<sup>2</sup>
                                    </span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.area}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Количество комнат</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.rooms}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Цена, рубли</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.price}</span>
                                </div>
                            </>
                        )}
                        {data?.type === 'Авто' && (
                            <>
                                <div className='flex justify-between pb-1'>
                                    <span>Марка</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.brand}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Модель</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.model}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Год выпуска</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.year}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Пробег, км</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.mileage}</span>
                                </div>
                            </>
                        )}
                        {data?.type === 'Услуги' && (
                            <>
                                <div className='flex justify-between pb-1'>
                                    <span>Тип услуги</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.serviceType}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Опыт работы, года</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.experience}</span>
                                </div>
                                <div className='flex justify-between pb-1'>
                                    <span>Стоимость, рубли</span>
                                    <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                    <span>{data?.cost}</span>
                                </div>
                                {data?.workSchedule && (
                                    <div className='flex justify-between pb-1'>
                                        <span>График работы</span>
                                        <div className='flex-1 border-b border-dashed border-gray-400 ' />
                                        <span>{data?.workSchedule}</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {me.data?.id === data?.user_id && (
                        <Button asChild>
                            <Link to={`/form?editing=${id}`}>Редактировать</Link>
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
};
