import { createContext, useContext } from 'react';
import { useGetMeQuery } from '@/api/queries';

const AuthContext = createContext(false);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { isSuccess } = useGetMeQuery();
    return <AuthContext value={isSuccess}>{children}</AuthContext>;
};

export const useIsAuthenticated = () => {
    const ctx = useContext(AuthContext);
    if (ctx === undefined) {
        throw new Error('useIsAuthenticated must be used within an AuthProvider');
    }

    return ctx;
};
