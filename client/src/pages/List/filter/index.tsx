import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { CATEGORY_TYPES } from '@/constants';
import { AutoFilter } from './auto-filter';
import { useEffect } from 'react';
import { ServiceFilter } from './service-filter';
import { EstateFilter } from './estate-filter';

export const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type') as (typeof CATEGORY_TYPES)[number] | null;

    useEffect(() => {
        if (type !== 'Авто')
            setSearchParams((params) => {
                params.delete('brand');
                params.delete('model');
                params.delete('year');
                params.delete('mileage');
                return params;
            });
        if (type !== 'Услуги')
            setSearchParams((params) => {
                params.delete('serviceType');
                params.delete('expierence');
                params.delete('cost');
                params.delete('workSchedule');
                return params;
            });
        if (type !== 'Недвижимость')
            setSearchParams((params) => {
                params.delete('propertyType');
                params.delete('area');
                params.delete('rooms');
                params.delete('price');
                return params;
            });
    }, [setSearchParams]);
    return (
        <aside className='w-full lg:w-[300px] flex flex-col gap-5 pt-5'>
            <div className='flex flex-col md:flex-row lg:flex-col gap-5 w-full'>
                <SearchByName />
                <SearchByLocation />
                <SearchByType />
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col gap-5 w-full'>
                {type === 'Авто' && <AutoFilter />}
                {type === 'Услуги' && <ServiceFilter />}
                {type === 'Недвижимость' && <EstateFilter />}
            </div>
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
                    className={cn('w-full justify-between', !searchParams.get('type') && 'text-muted-foreground')}
                >
                    {searchParams.get('type')
                        ? CATEGORY_TYPES.find((type) => type === searchParams.get('type'))
                        : 'Выберите тип'}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0'>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {CATEGORY_TYPES.map((type) => (
                                <CommandItem
                                    value={type}
                                    key={type}
                                    onSelect={() =>
                                        setSearchParams((params) => {
                                            params.get('type') === type
                                                ? params.delete('type')
                                                : params.set('type', type);
                                            return params;
                                        })
                                    }
                                >
                                    {type}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            type === searchParams.get('type') ? 'opacity-100' : 'opacity-0'
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

const SearchByName = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Input
            placeholder='Поиск по названию'
            value={searchParams.get('name') ?? ''}
            onChange={(e) =>
                setSearchParams((params) => {
                    e.target.value ? params.set('name', e.target.value) : params.delete('name');
                    return params;
                })
            }
        />
    );
};

const SearchByLocation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Input
            placeholder='Поиск по местоположению'
            value={searchParams.get('loc') ?? ''}
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('loc', e.target.value) : prev.delete('loc');
                    return prev;
                })
            }
        />
    );
};
