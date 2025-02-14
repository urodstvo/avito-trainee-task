import { useEffect } from 'react';
import type { SetFieldValue, FieldValues, UseFormWatch } from 'react-hook-form';

type FormPersistConfig<TFieldValues extends FieldValues> = {
    storage?: Storage;
    watch: UseFormWatch<TFieldValues>;
    setValue: SetFieldValue<TFieldValues>;
    validate?: boolean;
    dirty?: boolean;
    touch?: boolean;
};

export const useFormPersist = <TFieildValues extends FieldValues = FieldValues>(
    name: string,
    {
        storage = window.sessionStorage,
        watch,
        setValue,
        validate = false,
        dirty = false,
        touch = false,
    }: FormPersistConfig<TFieildValues>
) => {
    const watchedValues = watch();

    useEffect(() => {
        const str = storage.getItem(name);

        if (str) {
            const { _timestamp = null, ...values } = JSON.parse(str);
            const dataRestored: { [key: string]: any } = {};

            Object.keys(values).forEach((key) => {
                dataRestored[key] = values[key];
                setValue(key, values[key], {
                    shouldValidate: validate,
                    shouldDirty: dirty,
                    shouldTouch: touch,
                });
            });
        }
    }, [storage, name, setValue]);

    useEffect(() => {
        const values = Object.assign({}, watchedValues);

        if (Object.entries(values).length) {
            storage.setItem(name, JSON.stringify(values));
        }
    }, [watchedValues]);
};
