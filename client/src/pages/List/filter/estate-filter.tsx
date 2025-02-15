import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { PROPERTY_TYPES } from '@/constants';

export const EstateFilter = () => {
    return (
        <aside className='flex flex-col gap-5 w-[300px]'>
            <SearchByType />
            <SearchByArea />
            <SearchByRooms />
            <SearchByPrice />
        </aside>
    );
};

const SearchByType = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                        'w-full justify-between',
                        !searchParams.get('propertyType') && 'text-muted-foreground'
                    )}
                >
                    {searchParams.get('propertyType')
                        ? PROPERTY_TYPES.find((type) => type === searchParams.get('propertyType'))
                        : 'Выберите тип'}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0'>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {PROPERTY_TYPES.map((type) => (
                                <CommandItem
                                    value={type}
                                    key={type}
                                    onSelect={() =>
                                        setSearchParams((params) => {
                                            params.get('propertyType') === type
                                                ? params.delete('propertyType')
                                                : params.set('propertyType', type);
                                            return params;
                                        })
                                    }
                                >
                                    {type}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            type === searchParams.get('propertyType') ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const SearchByArea = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по площади в квадратных метрах'
            value={searchParams.get('area') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((params) => {
                    e.target.value ? params.set('area', e.target.value) : params.delete('area');
                    return params;
                })
            }
        />
    );
};

const SearchByRooms = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по количеству комнат'
            value={searchParams.get('rooms') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('rooms', e.target.value) : prev.delete('rooms');
                    return prev;
                })
            }
        />
    );
};

const SearchByPrice = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Максимальная цена в рублях'
            value={searchParams.get('price') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('price', e.target.value) : prev.delete('price');
                    return prev;
                })
            }
        />
    );
};
