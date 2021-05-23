import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

import useHttpClient from "../../shared/hooks/http-hook";

const UserPlaces: React.FC = () => {
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const { uid } = useParams<{ uid: string }>();
    const [UserPlaces, setUserPlaces] = useState<
        {
            id: string;
            image: string;
            title: string;
            description: string;
            address: string;
            creator: string;
            location: { lat: number; long: number };
        }[]
    >([]);

    useEffect(() => {
        const fetchUserPlaces = async () => {
            try {
                const { places } = await sendRequest(
                    `http://localhost:5000/api/places/user/${uid}`
                );
                setUserPlaces(places);
                console.log(places);
            } catch (error) {}
        };

        fetchUserPlaces();
    }, [setUserPlaces]);

    // const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === uid);
    return <PlaceList items={UserPlaces} />;
};

export default UserPlaces;
