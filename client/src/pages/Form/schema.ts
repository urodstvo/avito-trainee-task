import { z } from 'zod';

const primarySchema = z.object({
    name: z.string({ required_error: 'Название обязательно' }).min(1, 'Название обязательно'),
    description: z.string({ required_error: 'Описание обязательно' }).min(1, 'Описание обязательно'),
    location: z.string({ required_error: 'Локация обязательна' }).min(1, 'Локация обязательна'),
    image: z.string().url('Некорректная ссылка').optional(),
});

// Схемы для разных типов объявлений
const estateSchema = primarySchema.extend({
    type: z.literal('Недвижимость'),
    propertyType: z.string({ required_error: 'Тип недвижимости обязателен' }).min(1, 'Тип недвижимости обязателен'),
    area: z.coerce
        .number({ required_error: 'Площадь обязательна' })
        .positive('Площадь должна быть положительным числом'),
    rooms: z.coerce
        .number({ required_error: 'Количество комнат обязательно' })
        .int()
        .positive('Количество комнат должно быть положительным числом'),
    price: z.coerce.number({ required_error: 'Цена обязательна' }).positive('Цена должна быть положительным числом'),
});

const autoSchema = primarySchema.extend({
    type: z.literal('Авто'),
    brand: z.string({ required_error: 'Марка обязательна' }).min(1, 'Марка обязательна'),
    model: z.string({ required_error: 'Модель обязательна' }).min(1, 'Модель обязательна'),
    year: z.coerce
        .number({ required_error: 'Год обязателен' })
        .int('Год должен быть числом')
        .min(1900, 'Год некорректен'),
    mileage: z.coerce
        .number({ required_error: 'Пробег обязателен' })
        .positive('Пробег должен быть положительным числом'),
});

const serviceSchema = primarySchema.extend({
    type: z.literal('Услуги'),
    serviceType: z.string({ required_error: 'Тип услуги обязателен' }).min(1, 'Тип услуги обязателен'),
    experience: z.coerce
        .number({ required_error: 'Опыт обязателен' })
        .int('Опыт должен быть числом')
        .nonnegative('Опыт не может быть отрицательным'),
    cost: z.coerce
        .number({ required_error: 'Стоимость обязательна' })
        .positive('Стоимость должна быть положительным числом'),
    workSchedule: z.string().optional(),
});

export const schema = z.discriminatedUnion('type', [estateSchema, autoSchema, serviceSchema]);
