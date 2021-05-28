import React, { createContext, useState, useCallback } from "react";

interface ContextValue {
    isLoggedIn: boolean;
    userId: string | null;
    userToken: string | null;
    login: (userId: string, userToken: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<null | ContextValue>(null);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = useCallback((userId, userToken) => {
        setIsLoggedIn(true);
        setUserId(userId);
        setUserToken(userToken);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserToken(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, userId, userToken, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
