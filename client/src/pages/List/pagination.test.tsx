import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ItemsPagination } from './pagination';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

// Обертка для использования useSearchParams
const renderWithRouter = (component: React.ReactNode) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('ItemsPagination', () => {
    it('should not render pagination when totalPages is less than 2', () => {
        renderWithRouter(<ItemsPagination page={1} totalPages={1} />);
        const pagination = screen.queryByRole('navigation');
        expect(pagination).toBeNull();
    });

    it('should render pagination with correct page buttons', () => {
        renderWithRouter(<ItemsPagination page={2} totalPages={5} />);

        // Проверяем, что отображаются кнопки для страниц
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();

        // Проверяем, что кнопки "вперед" и "назад" отображаются
        expect(document.querySelector('.lucide-arrow-left')?.parentElement).toBeInTheDocument();
        expect(document.querySelector('.lucide-arrow-right')?.parentElement).toBeInTheDocument();
    });

    it('should disable "previous" button on the first page', () => {
        renderWithRouter(<ItemsPagination page={1} totalPages={5} />);

        const prevButton = document.querySelector('.lucide-arrow-left')?.parentElement;
        expect(prevButton).toBeDisabled();
    });

    it('should disable "next" button on the last page', () => {
        renderWithRouter(<ItemsPagination page={5} totalPages={5} />);

        const nextButton = document.querySelector('.lucide-arrow-right')?.parentElement;
        expect(nextButton).toBeDisabled();
    });

    it('should render pagination with ellipses when there are pages skipped', () => {
        renderWithRouter(<ItemsPagination page={4} totalPages={7} />);

        const svgElement = document.querySelector('.lucide-ellipsis');
        expect(svgElement).not.toBeNull();
        expect(svgElement).toBeInTheDocument();
    });

    it('should highlight the current page button', () => {
        renderWithRouter(<ItemsPagination page={3} totalPages={5} />);

        const currentPageButton = screen.getByText('3');
        expect(currentPageButton).toHaveClass('border');
        expect(currentPageButton).toHaveClass('bg-background');
        expect(currentPageButton).toBeDisabled();
    });
});
