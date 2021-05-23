import React, { createContext, useState, useCallback } from "react";

interface ContextValue {
    isLoggedIn: boolean;
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<null | ContextValue>(null);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const login = useCallback((userId) => {
        setIsLoggedIn(true);
        setUserId(userId);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
