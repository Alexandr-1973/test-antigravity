import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for existing session on mount
        const currentUser = authApi.getCurrentUser();
        if (currentUser && authApi.isAuthenticated()) {
            setUser(currentUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await authApi.login(email, password);
            setUser(result.user);
            return result;
        } catch (err) {
            setError(err.message || 'Failed to login');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await authApi.logout();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
