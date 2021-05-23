import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import useHttpClient from "../../shared/hooks/http-hook";

const Users: React.FC = () => {
    const [loadedUsers, setLoadedUsers] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<null | string>(null);
    const [isLoading, error, sendRequest, clearError] = useHttpClient() as [
        boolean,
        string | null,
        (
            url: string,
            method?: string | undefined,
            body?: BodyInit | undefined,
            headers?: any
        ) => any,
        () => any
    ];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let responseData = await sendRequest(
                    "http://localhost:5000/api/users",
                    "GET"
                );

                setLoadedUsers(responseData);
            } catch (error) {}
        };
        fetchUser();
    }, [sendRequest]);

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal show={error} onClear={clearError} error={error} />
            <UsersList items={loadedUsers} />;
        </React.Fragment>
    );
};

export default Users;
