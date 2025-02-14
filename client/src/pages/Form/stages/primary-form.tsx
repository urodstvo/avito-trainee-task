import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSetTypeContext } from '../context';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { schema } from '../schema';
const types = ['Авто', 'Услуги', 'Недвижимость'] as const;

export function PrimaryForm({
    control,
    setValue,
}: {
    control: UseFormReturn<z.infer<typeof schema>, any, undefined>['control'];
    setValue: UseFormReturn<z.infer<typeof schema>, any, undefined>['setValue'];
}) {
    const setType = useSetTypeContext();

    return (
        <div className='w-full lg:w-[400px] space-y-4 '>
            <FormField
                control={control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название объявления*</FormLabel>
                        <FormControl>
                            <Input placeholder='Название объявления' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='description'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Описание объявления*</FormLabel>
                        <FormControl>
                            <Input placeholder='Описание объявления' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='location'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Локация объявления*</FormLabel>
                        <FormControl>
                            <Input placeholder='Локация объявления' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='type'
                render={({ field }) => (
                    <FormItem className='flex flex-col'>
                        <FormLabel>Тип объявления*</FormLabel>
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
                                        {field.value ? types.find((type) => type === field.value) : 'Выберите тип'}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='min-w-[300px] lg:w-[400px] p-0'>
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {types.map((type) => (
                                                <CommandItem
                                                    value={type}
                                                    key={type}
                                                    onSelect={() => {
                                                        setValue('type', type);
                                                        setType(type);
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
                name='image'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ссылка на картинку/фото.</FormLabel>
                        <FormControl>
                            <Input placeholder='Ссылка на картинку/фото.' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
