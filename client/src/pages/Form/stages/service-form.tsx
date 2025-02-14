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

export const serviceTypes = [
    'Ремонт',
    'Уборка',
    'Доставка',
    'Строительство',
    'Репетиторство',
    'Курьерские услуги',
    'Автосервис',
    'Косметология',
    'Юридические услуги',
    'Финансовые консультации',
] as const;

export function ServiceForm({
    control,
    setValue,
}: {
    control: UseFormReturn<z.infer<typeof schema>, any, undefined>['control'];
    setValue: UseFormReturn<z.infer<typeof schema>, any, undefined>['setValue'];
}) {
    return (
        <div className='w-full lg:w-[400px] space-y-4 '>
            <FormField
                control={control}
                name='serviceType'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Тип услуги*</FormLabel>
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
                                            ? serviceTypes.find((type) => type === field.value)
                                            : 'Выберите тип'}
                                        <ChevronsUpDown className='opacity-50' />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className='min-w-[300px] lg:w-[400px] p-0'>
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {serviceTypes.map((type) => (
                                                <CommandItem
                                                    value={type}
                                                    key={type}
                                                    onSelect={() => {
                                                        // @ts-expect-error related to the zod scheme
                                                        setValue('serviceType', type);
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
                name='experience'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Опыт работы*</FormLabel>
                        <FormControl>
                            <Input placeholder='Опыт работы в годах' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='cost'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Стоимость услуги, рубли*</FormLabel>
                        <FormControl>
                            <Input placeholder='Стоимость услуги в рублях' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='workSchedule'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>График работы</FormLabel>
                        <FormControl>
                            <Input placeholder='График работы' {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
