import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import { Link } from "react-router-dom";

interface props {
    name: string;
    image: string;
    id: string;
    placeCount: number;
}

const UserItem: React.FC<props> = ({ name, image, id, placeCount }) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image">
                        <Avatar
                            image={`http://localhost:5000${image}`}
                            alt={name}
                        />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {placeCount} {placeCount === 1 ? "Place" : "Places"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
