import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormPersist } from './use-form-persist';

type StorageMock = Storage & {
    store: Record<string, string>;
};

// Mock storage
const mockStorage: StorageMock = {
    store: {},
    getItem(key: string) {
        return this.store[key] || null;
    },
    setItem(key: string, value: string) {
        this.store[key] = value;
    },
    removeItem(key: string) {
        delete this.store[key];
    },
    clear() {
        this.store = {};
    },
    get length() {
        return Object.keys(this.store).length;
    },
    key(index: number) {
        return Object.keys(this.store)[index] || null;
    },
};

describe('useFormPersist', () => {
    beforeEach(() => {
        mockStorage.clear();
    });

    it('should restore form values from storage', () => {
        mockStorage.setItem('test-form', JSON.stringify({ field1: 'saved value' }));

        const { result } = renderHook(() => {
            const { watch, setValue } = useForm();
            useFormPersist('test-form', { watch, setValue, storage: mockStorage });
            return watch;
        });

        expect(result.current('field1')).toBe('saved value');
    });

    it('should persist form values to storage', () => {
        const { result } = renderHook(() => {
            const { watch, setValue } = useForm();
            useFormPersist('test-form', { watch, setValue, storage: mockStorage });
            return { watch, setValue };
        });

        act(() => {
            result.current.setValue('field1', 'new value');
        });

        expect(JSON.parse(mockStorage.getItem('test-form')!)).toEqual({ field1: 'new value' });
    });
});
