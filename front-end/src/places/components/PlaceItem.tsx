import React from "react";

import Card from "../../shared/components/UIElements/Card";

import "./PlaceItem.css";

interface props {
    id: string;
    image: string;
    title: string;
    description: string;
    creatorId: string;
    coordinates: { lat: number; long: number };
    address: string;
}

const PlaceItem: React.FC<props> = ({ title, image, address }) => {
    return (
        <li className="place-item">
            <Card>
                <div className="place-item__image">
                    <img src={image} alt={title} />
                </div>
                <div className="place-item__info">
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                </div>
                <div className="place-item__actions">
                    <button>VIEW ON MAP</button>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
            </Card>
        </li>
    );
};

export default PlaceItem;
