import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import { LoginForm } from './login-form';
import { useFormPersist } from '@/lib/hooks';

vi.mock('@/lib/hooks', () => ({
    useFormPersist: vi.fn(),
}));

vi.mock('@/api/queries', () => ({
    useLoginMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: false, isSuccess: false })),
}));

describe('LoginForm', () => {
    it('renders form fields and submit button', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('*************')).toBeInTheDocument();
        expect(screen.getByText('Авторизоваться')).toBeInTheDocument();
    });

    it('calls useFormPersist with correct arguments', () => {
        render(<LoginForm />, { wrapper: MemoryRouter });

        expect(useFormPersist).toHaveBeenCalledWith(
            'login-form',
            expect.objectContaining({
                watch: expect.any(Function),
                setValue: expect.any(Function),
            })
        );
    });

    it('disables submit button while submitting', () => {
        vi.mock('@/api/queries', () => ({
            useLoginMutation: vi.fn(() => ({ mutate: vi.fn(), isPending: true, isSuccess: false })),
        }));

        render(<LoginForm />, { wrapper: MemoryRouter });
        expect(screen.getByText('Авторизоваться')).toBeDisabled();
    });
});
