import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

import useHttpClient from "../../shared/hooks/http-hook";

const UserPlaces: React.FC = () => {
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const { uid } = useParams<{ uid: string }>();
    const [UserPlaces, setUserPlaces] = useState<
        {
            _id: string;
            image: string;
            title: string;
            description: string;
            address: string;
            creator: string;
            location: { lat: number; long: number };
        }[]
    >([]);

    const updateUserPlaces = useCallback((placeId: string) => {
        setUserPlaces((places) =>
            places.filter((place) => place._id !== placeId)
        );
    }, []);

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const { places } = await sendRequest(
                    `http://localhost:5000/api/places/user/${uid}`
                );
                setUserPlaces(places);
            } catch (error) {}
        };

        fetchUserPlaces();
    }, [setUserPlaces, sendRequest, uid]);

    return <PlaceList items={UserPlaces} updateUserPlaces={updateUserPlaces} />;
};

export default UserPlaces;
