import React from "react";
import UsersList from "../components/UsersList";

const Users: React.FC = () => {
    const USERS = [
        {
            id: "u1",
            name: "Max S",
            image: "https://images.pexels.com/photos/827518/pexels-photo-827518.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            places: 3,
        },
        {
            id: "u2",
            name: "Demi L",
            image: "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            places: 4,
        },
    ];

    return <UsersList items={USERS} />;
};

export default Users;
