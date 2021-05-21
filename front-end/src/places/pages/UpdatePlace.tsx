import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

import useForm from "../../shared/hooks/form-hook";

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

    const [isLoading, setIsloading] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "k",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeid);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace?.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace?.description,
                        isValid: true,
                    },
                    address: {
                        value: identifiedPlace?.address,
                        isValid: true,
                    },
                },
                true
            );
        }
        setIsloading(false);
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if (isLoading) {
        return (
            <div className="center">
                <Card>
                    <h2>Loading...</h2>
                </Card>
            </div>
        );
    }

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <form
            action=""
            className="place-form"
            onSubmit={placeUpdateSubmitHandler}
        >
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                value={formState.inputs.title.value}
                valid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid title (at least 5 characters)"
                onInput={inputHandler}
                value={formState.inputs.description.value}
                valid={formState.inputs.description.isValid}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address"
                onInput={inputHandler}
                value={formState.inputs.address?.value}
                valid={formState.inputs.address?.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
