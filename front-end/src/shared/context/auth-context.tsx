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

    const login = useCallback((userId, userToken, expiration?: Date) => {
        setIsLoggedIn(true);
        const expirationDate = expiration
            ? new Date(expiration)
            : new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId,
                userToken,
                expirationDate: expirationDate.toISOString(),
            })
        );
        setUserId(userId);
        setUserToken(userToken);
    }, []);
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        localStorage.removeItem("userData");
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
