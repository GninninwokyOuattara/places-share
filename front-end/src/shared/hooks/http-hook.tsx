import React, { useState, useCallback, useEffect, useRef } from "react";

const useHttpClient = (): [
    boolean,
    string | null,
    (
        url: string,
        method?: string | undefined,
        body?: BodyInit | undefined,
        headers?: any
    ) => any,
    () => any
] => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const activeHttpRequest = useRef<AbortController[]>([]);

    const sendRequest = useCallback(
        async (url: string, method = "GET", body, headers) => {
            setIsLoading(true);
            const httpAbortController = new AbortController();
            activeHttpRequest.current.push(httpAbortController);
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortController.signal,
                });

                const responseData = await response.json();
                activeHttpRequest.current = activeHttpRequest.current.filter(
                    (controller) => controller !== httpAbortController
                );
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            } catch (err) {
                setIsLoading(false);
                setError(
                    err.message || "Something went wrong, please try again"
                );
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequest.current.forEach((request) => {
                request.abort();
            });
        };
    }, []);

    return [isLoading, error, sendRequest, clearError];
};

export default useHttpClient;
