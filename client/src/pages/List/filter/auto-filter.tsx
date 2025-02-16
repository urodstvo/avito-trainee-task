import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { CAR_BRANDS } from '@/constants';
export const AutoFilter = () => {
    return (
        <>
            <SearchByBrand />
            <SearchByModel />
            <SearchByYear />
        </>
    );
};

const SearchByBrand = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    className={cn('w-full justify-between', !searchParams.get('brand') && 'text-muted-foreground')}
                >
                    {searchParams.get('brand')
                        ? CAR_BRANDS.find((brand) => brand === searchParams.get('brand'))
                        : 'Выберите тип'}
                    <ChevronsUpDown className='opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] p-0'>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {CAR_BRANDS.map((brand) => (
                                <CommandItem
                                    value={brand}
                                    key={brand}
                                    onSelect={() =>
                                        setSearchParams((params) => {
                                            params.get('brand') === brand
                                                ? params.delete('brand')
                                                : params.set('brand', brand);
                                            return params;
                                        })
                                    }
                                >
                                    {brand}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            brand === searchParams.get('brand') ? 'opacity-100' : 'opacity-0'
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

const SearchByModel = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по модели'
            value={searchParams.get('model') ?? ''}
            onChange={(e) =>
                setSearchParams((params) => {
                    e.target.value ? params.set('model', e.target.value) : params.delete('model');
                    return params;
                })
            }
        />
    );
};

const SearchByYear = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по году выпуска'
            value={searchParams.get('year') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('year', e.target.value) : prev.delete('year');
                    return prev;
                })
            }
        />
    );
};

const SearchByMileage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Input
            placeholder='Поиск по пробегу'
            value={searchParams.get('mileage') ?? ''}
            type='number'
            onChange={(e) =>
                setSearchParams((prev) => {
                    e.target.value ? prev.set('mileage', e.target.value) : prev.delete('mileage');
                    return prev;
                })
            }
        />
    );
};
