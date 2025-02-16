import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { SERVICE_TYPES } from '@/constants';

export const ServiceFilter = () => {
    return (
        <>
            <SearchByType />
            <SearchByExpierence />
            <SearchByCost />
        </>
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
                        !searchParams.get('serviceType') && 'text-muted-foreground'
                    )}
                >
                    {searchParams.get('serviceType')
                        ? SERVICE_TYPES.find((type) => type === searchParams.get('serviceType'))
                        : 'Выберите тип'}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0'>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {SERVICE_TYPES.map((type) => (
                                <CommandItem
                                    value={type}
                                    key={type}
                                    onSelect={() =>
                                        setSearchParams((params) => {
                                            params.get('serviceType') === type
                                                ? params.delete('serviceType')
                                                : params.set('serviceType', type);
                                            return params;
                                        })
                                    }
                                >
                                    {type}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            type === searchParams.get('serviceType') ? 'opacity-100' : 'opacity-0'
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

const SearchByExpierence = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по годам опыта'
            value={searchParams.get('expierence') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((params) => {
                    e.target.value ? params.set('expierence', e.target.value) : params.delete('expierence');
                    return params;
                })
            }
        />
    );
};

const SearchByCost = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Максимальная стоимость в рублях'
            value={searchParams.get('cost') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('cost', e.target.value) : prev.delete('cost');
                    return prev;
                })
            }
        />
    );
};
