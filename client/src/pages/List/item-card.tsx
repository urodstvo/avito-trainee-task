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
