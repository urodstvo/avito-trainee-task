import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ItemList } from './item-card';
import type { Item } from '@/api';

const sampleItems: Item[] = [
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

describe('ItemList', () => {
    it('renders all items with correct details', () => {
        render(<ItemList items={sampleItems} />, { wrapper: MemoryRouter });

        expect(screen.getByText('Item One')).toBeInTheDocument();
        expect(screen.getByText('Description for item one.')).toBeInTheDocument();
        expect(screen.getByText('Location A')).toBeInTheDocument();
        expect(screen.getByText('Недвижимость')).toBeInTheDocument();

        const firstImage = screen.getByAltText('Item One');
        expect(firstImage).toHaveAttribute('src', 'https://example.com/image1.jpg');

        const links = screen.getAllByRole('link', { name: /Открыть/i });
        expect(links[0]).toHaveAttribute('href', '/item/1');

        expect(screen.getByText('Item Two')).toBeInTheDocument();
        expect(screen.getByText('Description for item two.')).toBeInTheDocument();
        expect(screen.getByText('Location B')).toBeInTheDocument();
        expect(screen.getByText('Авто')).toBeInTheDocument();

        const secondImage = screen.getByAltText('Item Two');
        expect(secondImage).toHaveAttribute(
            'src',
            'https://archive.org/download/placeholder-image/placeholder-image.jpg'
        );

        expect(links[1]).toHaveAttribute('href', '/item/2');
    });
});
