import React from "react";
import UsersList from "../components/UsersList";

const Users: React.FC = () => {
    const USERS: [] = [];

    return <UsersList items={USERS} />;
};

export default Users;
