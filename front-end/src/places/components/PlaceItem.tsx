import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

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

const PlaceItem: React.FC<props> = ({
    id,
    title,
    image,
    address,
    coordinates,
}) => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const center = { lat: coordinates.lat, lng: coordinates.long };

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map center={center} zoom={16} />
                </div>
            </Modal>
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
                        <Button inverse onClick={openMapHandler}>
                            VIEW ON MAP
                        </Button>
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
