import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceList.css";

interface props {
    items: {
        id: string;
        image: string;
        title: string;
        description: string;
        address: string;
        creator: string;
        location: { lat: number; long: number };
    }[];
}

const PlaceList: React.FC<props> = ({ items }) => {
    if (items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>No places found, maybe create one ?</h2>
                    <Button to="/places/new">SHARE PLACE</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="place-list">
            {items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    );
};

export default PlaceList;
