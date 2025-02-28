import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ItemPage } from '.';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useParams: () => ({ id: '123' }),
    };
});

const mockItemData = {
    image: 'test-image.jpg',
    name: 'Test Item',
    description: 'Test description',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 50,
    rooms: 2,
    price: 1000000,
    user_id: 1,
};

vi.mock('@/api/queries', () => ({
    useGetItemQuery: vi.fn(),
    useGetMeQuery: vi.fn(),
}));

vi.mock('@/lib/hooks', () => ({
    useTitle: vi.fn(),
    useFormPersist: vi.fn(),
}));

const mockCancelQueries = vi.fn();
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: () => ({ cancelQueries: mockCancelQueries }),
}));

// Импортируем замоканные хуки для настройки в тестах
import { useGetItemQuery, useGetMeQuery } from '@/api/queries';
import { useTitle } from '@/lib/hooks';

describe('ItemPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('displays information for a real estate listing', async () => {
        (useGetItemQuery as any).mockReturnValue({
            data: mockItemData,
            error: null,
        });
        (useGetMeQuery as any).mockReturnValue({
            data: { id: 2 },
        });
        render(<ItemPage />, { wrapper: MemoryRouter });

        expect(useTitle).toHaveBeenCalledWith('Просмотр объявления 123');

        await waitFor(() => {
            expect(screen.getByText('Test Item')).toBeInTheDocument();
        });

        expect(screen.getByAltText('Test Item')).toHaveAttribute('src', 'test-image.jpg');
        expect(screen.getByText('Test description')).toBeInTheDocument();

        expect(screen.getByText('Тип недвижимости')).toBeInTheDocument();
        expect(screen.getByText('Квартира')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('1000000')).toBeInTheDocument();

        const roomsLabel = screen.getByText('Количество комнат');
        const roomsRow = roomsLabel.closest('div');
        expect(within(roomsRow!).getByText('2')).toBeInTheDocument();

        expect(screen.queryByText('Редактировать')).not.toBeInTheDocument();
    });

    it('displays the "Edit" button if the current user is the owner of the listing', async () => {
        (useGetItemQuery as any).mockReturnValue({
            data: mockItemData,
            error: null,
        });
        (useGetMeQuery as any).mockReturnValue({
            data: { id: 1 },
        });

        render(<ItemPage />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(screen.getByText('Test Item')).toBeInTheDocument();
        });

        expect(screen.getByText('Редактировать')).toBeInTheDocument();
    });

    it('calls cancelQueries on unmount', () => {
        const { unmount } = render(<ItemPage />, { wrapper: MemoryRouter });
        unmount();
        expect(mockCancelQueries).toHaveBeenCalledWith({ queryKey: ['items', '123'] });
        expect(mockCancelQueries).toHaveBeenCalledWith({ queryKey: ['get-me'] });
    });
});
