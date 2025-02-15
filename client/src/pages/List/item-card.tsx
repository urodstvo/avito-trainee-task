import type { Item } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { memo } from 'react';
import { Link } from 'react-router';

const ItemCard = memo(({ item }: { item: Item }) => {
    return (
        <Card className='flex w-full p-2 border-none shadow-none hover:bg-accent transition-colors duration-200 items-end h-[136px] gap-10'>
            <div className='rounded-lg overflow-hidden size-[120px] bg-accent'>
                <img
                    className='object-cover size-full'
                    src={item.image ?? 'https://archive.org/download/placeholder-image/placeholder-image.jpg'}
                    alt={item.name}
                />
            </div>
            <CardHeader className='py-0 px-0 flex-1 flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-0'>
                    <CardTitle className='line-clamp-1'>{item.name}</CardTitle>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-5'>
                            <small className='text-sm text-muted-foreground'>{item.type}</small>
                            <small className='text-sm text-muted-foreground line-clamp-1'>{item.location}</small>
                        </div>
                        <Button variant='link' asChild>
                            <Link to={`/item/${item.id}`}>Открыть</Link>
                        </Button>
                    </div>
                </div>
                <CardDescription className='line-clamp-3 overflow-ellipsis flex-1'>{item.description}</CardDescription>
            </CardHeader>
        </Card>
    );
});

export const ItemList = ({ items }: { items: Item[] }) => {
    return (
        <div className='flex flex-col gap-2 w-full flex-1'>
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </div>
    );
};

// {item.type === 'Недвижимость' && (
//     <>
//         <p className='flex justify-between pb-1'>
//             <span>Тип недвижимости</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.propertyType}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>
//                 Площадь, м<sup>2</sup>
//             </span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.area}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Количество комнат</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.rooms}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Цена, рубли</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.price}</span>
//         </p>
//     </>
// )}
// {item.type === 'Авто' && (
//     <>
//         <p className='flex justify-between pb-1'>
//             <span>Марка</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.brand}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Модель</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.model}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Год выпуска</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.year}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Пробег, км</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.mileage}</span>
//         </p>
//     </>
// )}
// {item.type === 'Услуги' && (
//     <>
//         <p className='flex justify-between pb-1'>
//             <span>Тип услуги</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.serviceType}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Опыт работы, года</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.experience}</span>
//         </p>
//         <p className='flex justify-between pb-1'>
//             <span>Стоимость, рубли</span>
//             <div className='flex-1 border-b border-dashed border-gray-400 ' />
//             <span>{item.cost}</span>
//         </p>
//         {item.workSchedule && (
//             <p className='flex justify-between pb-1'>
//                 <span>График работы</span>
//                 <div className='flex-1 border-b border-dashed border-gray-400 ' />
//                 <span>{item.workSchedule}</span>
//             </p>
//         )}
//     </>
// )}
