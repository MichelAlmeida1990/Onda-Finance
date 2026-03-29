import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '@/pages/LoginPage';
import { useAuthStore } from '@/store/auth';
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});
function renderLogin() {
    const qc = new QueryClient();
    return render(_jsx(QueryClientProvider, { client: qc, children: _jsx(MemoryRouter, { children: _jsx(LoginPage, {}) }) }));
}
describe('Fluxo de Login', () => {
    beforeEach(() => {
        useAuthStore.setState({ user: null });
        mockNavigate.mockClear();
    });
    it('exibe erros de validação com campos vazios', async () => {
        renderLogin();
        await userEvent.click(screen.getByTestId('login-btn'));
        await waitFor(() => {
            expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
            expect(screen.getByText('Mínimo 6 caracteres')).toBeInTheDocument();
        });
    });
    it('exibe erro com credenciais incorretas', async () => {
        renderLogin();
        await userEvent.type(screen.getByTestId('email-input'), 'errado@email.com');
        await userEvent.type(screen.getByTestId('password-input'), 'senhaerrada');
        await userEvent.click(screen.getByTestId('login-btn'));
        await waitFor(() => {
            expect(screen.getByText('E-mail ou senha incorretos')).toBeInTheDocument();
        });
    });
    it('autentica e redireciona com credenciais corretas', async () => {
        renderLogin();
        await userEvent.type(screen.getByTestId('email-input'), 'usuario@onda.com');
        await userEvent.type(screen.getByTestId('password-input'), '123456');
        await userEvent.click(screen.getByTestId('login-btn'));
        await waitFor(() => {
            expect(useAuthStore.getState().user?.email).toBe('usuario@onda.com');
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });
});
