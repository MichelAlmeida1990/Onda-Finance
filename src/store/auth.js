import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export const useAuthStore = create()(persist((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}), {
    name: 'auth-storage',
    storage: createJSONStorage(() => {
        // Verifica se está no browser antes de acessar localStorage
        if (typeof window !== 'undefined') {
            return localStorage;
        }
        // Fallback para servidor
        return {
            getItem: () => null,
            setItem: () => { },
            removeItem: () => { },
        };
    }),
}));
