import { render, screen } from '@testing-library/react';
import { getCountTitle, ListPage } from '.';
import { MemoryRouter } from 'react-router';
import { useSearchParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useTitle } from '@/lib/hooks';
import { vi, describe, beforeEach, test, expect, it } from 'vitest';
import type { Item } from '@/api';
import { useGetItemsQuery } from '@/api/queries';

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useSearchParams: vi.fn(),
    };
});

vi.mock('@/api/queries', () => ({
    useGetItemsQuery: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
    useQueryClient: vi.fn(),
}));

vi.mock('@/lib/hooks', () => ({
    useTitle: vi.fn(),
}));

const mockData: Item[] = [
    {
        id: 1,
        user_id: 1,
        name: 'Item One',
        description: 'Description for item one.',
        location: 'Location A',
        image: 'https://example.com/image1.jpg',
        type: 'Недвижимость',
        propertyType: 'Apartment',
        area: 50,
        rooms: 2,
        price: 1000000,
    },
    {
        id: 2,
        user_id: 2,
        name: 'Item Two',
        description: 'Description for item two.',
        location: 'Location B',
        image: '',
        type: 'Авто',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2020,
        mileage: 15000,
    },
];

describe('ListPage', () => {
    const mockSetSearchParams = vi.fn();

    beforeEach(() => {
        useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
        useGetItemsQuery.mockReturnValue({ data: mockData });
        useQueryClient.mockReturnValue({ cancelQueries: vi.fn() });
        useTitle.mockImplementation(() => {});
    });

    test('should set the title correctly', () => {
        render(<ListPage />, { wrapper: MemoryRouter });

        expect(useTitle).toHaveBeenCalledWith('Список объявлений');
    });

    test('should cancel previous queries when component is unmounted', () => {
        const cancelQueries = vi.fn();
        useQueryClient.mockReturnValue({ cancelQueries });

        const { unmount } = render(<ListPage />, { wrapper: MemoryRouter });

        unmount();

        expect(cancelQueries).toHaveBeenCalledWith({ queryKey: ['items'] });
    });
});

describe('getCountTitle', () => {
    it('should return correct title for 1 item', () => {
        expect(getCountTitle(1)).toBe('1 объявление');
    });

    it('should return correct title for 2 items', () => {
        expect(getCountTitle(2)).toBe('2 объявления');
    });

    it('should return correct title for 3 items', () => {
        expect(getCountTitle(3)).toBe('3 объявления');
    });

    it('should return correct title for 4 items', () => {
        expect(getCountTitle(4)).toBe('4 объявления');
    });

    it('should return correct title for 5 items', () => {
        expect(getCountTitle(5)).toBe('5 объявлений');
    });

    it('should return correct title for 21 item', () => {
        expect(getCountTitle(21)).toBe('21 объявление');
    });

    it('should return correct title for 22 items', () => {
        expect(getCountTitle(22)).toBe('22 объявления');
    });

    it('should return correct title for 25 items', () => {
        expect(getCountTitle(25)).toBe('25 объявлений');
    });

    it('should return correct title for 100 items', () => {
        expect(getCountTitle(100)).toBe('100 объявлений');
    });

    it('should return correct title for 101 item', () => {
        expect(getCountTitle(101)).toBe('101 объявление');
    });

    it('should return correct title for 102 items', () => {
        expect(getCountTitle(102)).toBe('102 объявления');
    });

    it('should return correct title for 111 items', () => {
        expect(getCountTitle(111)).toBe('111 объявлений');
    });

    it('should return correct title for 112 items', () => {
        expect(getCountTitle(112)).toBe('112 объявлений');
    });

    it('should return correct title for 120 items', () => {
        expect(getCountTitle(120)).toBe('120 объявлений');
    });

    it('should return correct title for 1001 item', () => {
        expect(getCountTitle(1001)).toBe('1001 объявление');
    });

    it('should return correct title for 1002 items', () => {
        expect(getCountTitle(1002)).toBe('1002 объявления');
    });

    it('should return correct title for 1005 items', () => {
        expect(getCountTitle(1005)).toBe('1005 объявлений');
    });
});
