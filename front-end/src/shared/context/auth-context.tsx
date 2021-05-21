import React, { createContext, useState, useCallback } from "react";

export const AuthContext =
    createContext<null | {
        [key: string]: boolean | (() => () => any);
    }>(null);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback<any>(() => setIsLoggedIn(true), []);
    const logout = useCallback<any>(() => setIsLoggedIn(false), []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
