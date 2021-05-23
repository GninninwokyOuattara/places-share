import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { AuthContext } from "../../shared/context/auth-context";
import useHttpClient from "../../shared/hooks/http-hook";

import "./PlaceItem.css";

interface props {
    id: string;
    image: string;
    title: string;
    description: string;
    creatorId: string;
    coordinates: { lat: number; long: number };
    address: string;
    updateUserPlaces: (placeId: string) => void;
}

const PlaceItem: React.FC<props> = ({
    id,
    title,
    image,
    address,
    coordinates,
    creatorId,
    updateUserPlaces,
}) => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const auth = useContext(AuthContext) as { isLoggedIn: boolean };
    const [isLoading, error, sendRequest, clearError] = useHttpClient();

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);
    const deleteModalConfirmHandler = async () => {
        setShowDeleteModal(false);
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${id}`,
                "DELETE"
            );
            updateUserPlaces(id);
        } catch (error) {}
    };

    const center = { lat: coordinates.lat, lng: coordinates.long };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

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
            <Modal
                show={showDeleteModal}
                header="Are you sure ?"
                footerClass="place-item__modal-actions"
                onCancel={closeDeleteModal}
                footer={
                    <React.Fragment>
                        <Button inverse onClick={deleteModalConfirmHandler}>
                            CONFIRM
                        </Button>
                        <Button danger onClick={closeDeleteModal}>
                            CANCEL
                        </Button>
                    </React.Fragment>
                }
            >
                Do you want to proceed and delete this place ? Please not this
                action cannot be undone !
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
                        {auth.isLoggedIn && (
                            <React.Fragment>
                                <Button to={`/places/${id}`}>EDIT</Button>
                                <Button danger onClick={openDeleteModal}>
                                    DELETE
                                </Button>
                            </React.Fragment>
                        )}
                    </div>
                    {isLoading && <LoadingSpinner asOverlay />}
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
