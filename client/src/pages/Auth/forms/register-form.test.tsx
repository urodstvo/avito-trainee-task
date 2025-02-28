import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterForm } from './register-form';

const useRegisterMutationMock = vi.fn();
let mockMutate = vi.fn();

vi.mock('@/api/queries', () => ({
    useRegisterMutation: () => useRegisterMutationMock(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('@/lib/hooks', () => ({
    useFormPersist: vi.fn(),
}));

describe('RegisterForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockMutate = vi.fn();
        useRegisterMutationMock.mockReturnValue({
            mutate: mockMutate,
            isPending: false,
            isSuccess: false,
        });
    });

    it('displays form fields and a submit button', () => {
        render(<RegisterForm />, { wrapper: MemoryRouter });

        expect(screen.getByLabelText(/Имя пользователя/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Пароль$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Повторите пароль/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Зарегистрироваться/i })).toBeInTheDocument();
        expect(screen.getByText(/Авторизоваться/i)).toBeInTheDocument();
    });

    it('calls mutate with truncated values ​​when submitting the form', async () => {
        render(<RegisterForm />, { wrapper: MemoryRouter });

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        const passwordInputs = screen.getAllByPlaceholderText('*************');
        const passwordInput = passwordInputs[0];
        const repeatPasswordInput = passwordInputs[1];

        // Заполняем поля с пробелами по краям
        fireEvent.change(usernameInput, { target: { value: ' testuser ' } });
        fireEvent.blur(usernameInput);
        fireEvent.change(passwordInput, { target: { value: ' secret ' } });
        fireEvent.blur(passwordInput);
        fireEvent.change(repeatPasswordInput, { target: { value: ' secret ' } });
        fireEvent.blur(repeatPasswordInput);

        const submitButton = screen.getByRole('button', { name: /Зарегистрироваться/i });

        // Ждём, пока кнопка станет активной (не disabled)
        await waitFor(() => {
            expect(submitButton).not.toBeDisabled();
        });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'secret',
            });
        });
    });
});
