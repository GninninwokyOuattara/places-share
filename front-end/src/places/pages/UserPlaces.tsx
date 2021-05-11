import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "empire state building",
        description: "one of the most famous place in the world",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/260px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        address: "20 W 34 St, New York, NY 10001",
        location: {
            lat: 40.74,
            long: -73.98,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "empire state builde",
        description: "one of the most famous place in the world",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/260px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        address: "20 W 34 St, New York, NY 10001",
        location: {
            lat: 40.74,
            long: -73.98,
        },
        creator: "u2",
    },
];

const UserPlaces: React.FC = () => {
    return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
