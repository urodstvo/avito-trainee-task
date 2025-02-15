import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '../schema';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { ChevronsUpDown, Check } from 'lucide-react';
import { PROPERTY_TYPES } from '@/constants';

const propertyTypes = PROPERTY_TYPES;

export function EstateForm({
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
                name='propertyType'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Тип недвижимости*</FormLabel>
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
                                            ? propertyTypes.find((type) => type === field.value)
                                            : 'Выберите тип'}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='min-w-[300px] lg:w-[400px] p-0'>
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {propertyTypes.map((type) => (
                                                <CommandItem
                                                    value={type}
                                                    key={type}
                                                    onSelect={() => {
                                                        setValue('propertyType', type);
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
                name='area'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Площадь, м<sup>2</sup>*
                        </FormLabel>
                        <FormControl>
                            <Input placeholder='Площадь в квадратных метрах' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='rooms'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Количество комнат*</FormLabel>
                        <FormControl>
                            <Input placeholder='Количество комнат' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='price'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Цена, рубли*</FormLabel>
                        <FormControl>
                            <Input placeholder='Цена в рублях' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
