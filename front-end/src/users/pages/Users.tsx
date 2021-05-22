import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Users: React.FC = () => {
    const [loadedUsers, setLoadedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        setIsLoading(true);
        const fetchUser = async () => {
            try {
                let response = await fetch("http://localhost:5000/api/users");

                let responseData = await response.json();
                if (!response.ok) throw new Error(responseData.error);

                setLoadedUsers(responseData);
                console.log(responseData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal
                show={error}
                onClear={() => setError(null)}
                error={error}
            />
            <UsersList items={loadedUsers} />;
        </React.Fragment>
    );
};

export default Users;
