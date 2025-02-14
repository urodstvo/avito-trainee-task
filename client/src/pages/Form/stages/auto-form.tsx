import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '../schema';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const carBrands = [
    'Toyota',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Volkswagen',
    'Ford',
    'Chevrolet',
    'Honda',
    'Hyundai',
    'Nissan',
    'Lexus',
    'Kia',
    'Mazda',
    'Porsche',
    'Subaru',
    'Volvo',
    'Tesla',
    'Land Rover',
    'Jaguar',
    'Mitsubishi',
] as const;

export function AutoForm({
    control,
    setValue,
}: {
    control: UseFormReturn<z.infer<typeof schema>, any, undefined>['control'];
    setValue: UseFormReturn<z.infer<typeof schema>, any, undefined>['setValue'];
}) {
    return (
        <div className='w-full lg:w-[400px] space-y-4'>
            <FormField
                control={control}
                name='brand'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Марка автомобиля*</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant='outline'
                                        role='combobox'
                                        className={cn(
                                            'w-full justify-between',
                                            !field.value && 'text-muted-foreground'
                                        )}
                                    >
                                        {field.value
                                            ? carBrands.find((type) => type === field.value)
                                            : 'Выберите марку'}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='min-w-[300px] lg:w-[400px] p-0'>
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {carBrands.map((type) => (
                                                <CommandItem
                                                    value={type}
                                                    key={type}
                                                    onSelect={() => {
                                                        setValue('brand', type);
                                                    }}
                                                >
                                                    {type}
                                                    <Check
                                                        className={cn(
                                                            'ml-auto',
                                                            type === field.value ? 'opacity-100' : 'opacity-0'
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='model'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Модель автомобиля*</FormLabel>
                        <FormControl>
                            <Input placeholder='Модель автомобиля' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='year'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Год выпуска*</FormLabel>
                        <FormControl>
                            <Input placeholder='Год выпуска' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='mileage'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Пробег, км*</FormLabel>
                        <FormControl>
                            <Input placeholder='Пробег в километрах' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
