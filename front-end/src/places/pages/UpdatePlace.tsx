import React from "react";
import { useParams } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "empire state building",
        description: "one of the most famous place in the world",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/260px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg/260px-Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        address: "20 W 34 St, New York, NY 10001",
        location: {
            lat: 40.74,
            long: -73.98,
        },
        creator: "u2",
    },
];

const UpdatePlace = () => {
    const { placeid } = useParams<{ placeid: string }>();

    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeid);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        );
    }

    return (
        <form action="" className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={() => {}}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid title (at least 5 characters)"
                onInput={() => {}}
                value={identifiedPlace.description}
                valid={true}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Description"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={() => {}}
                value={identifiedPlace.address}
                valid={true}
            />
            <Button type="submit" disabled={true}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
