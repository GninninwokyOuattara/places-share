import { setuid } from "process";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../context/auth-context";

const useAuth = () => {
    const [uuid, setUuid] = useState<null | string>(null);
    const [expirationDate, setExpirationDate] = useState<null | number>(null);
    const auth = useContext(AuthContext) as {
        isLoggedIn: boolean;
        logout: () => void;
        login: (
            userId: string,
            userToken: string,
            expirationDate?: string
        ) => void;
    };

    let timerId: ReturnType<typeof setTimeout>;

    useEffect(() => {
        const userData: {
            userId: string;
            userToken: string;
            expirationDate: string;
        } = JSON.parse(localStorage.getItem("userData") as string);
        console.log(userData);
        if (userData) {
            setExpirationDate(new Date(userData.expirationDate).getTime());
            setUuid(userData.userId);
        }
        if (
            userData &&
            userData.userToken &&
            userData.userId &&
            userData.expirationDate &&
            new Date(userData.expirationDate) > new Date()
        ) {
            auth.login(
                userData.userId,
                userData.userToken,
                userData.expirationDate
            );
        } else {
            auth.logout();
        }

        console.log(userData);
    }, [auth.login, auth.logout]);

    useEffect(() => {
        if (auth.isLoggedIn && expirationDate) {
            timerId = setTimeout(() => {
                auth.logout();
            }, expirationDate - new Date().getTime());
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [auth.isLoggedIn, expirationDate]);

    return { uuid, expirationDate, auth };
};

export default useAuth;
