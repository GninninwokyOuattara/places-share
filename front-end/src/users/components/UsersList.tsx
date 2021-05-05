import React from "react";
import UserItem from "./UserItem";

import "./UsersList.css";
type item = { id: string; name: string; image: string; places: number };

interface props {
    items: item[];
}

const UsersList: React.FC<props> = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No user found</h2>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {props.items.map((user) => {
                return (
                    <UserItem
                        key={user.id}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places}
                    />
                );
            })}
        </ul>
    );
};

export default UsersList;
