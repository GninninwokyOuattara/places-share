import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import errorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

import useForm from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdatePlace = () => {
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const { placeid } = useParams<{ placeid: string }>();
    const [placeFound, setPlaceFound] = useState(false);
    const history = useHistory();
    const { userId } = useContext(AuthContext) as { userId: string };

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const fetchPlaceData = useCallback(async () => {
        try {
            const { place } = await sendRequest(
                `http://localhost:5000/api/places/${placeid}`
            );
            setFormData(
                {
                    title: {
                        value: place.title,
                        isValid: true,
                    },
                    description: {
                        value: place.description,
                        isValid: true,
                    },
                    address: {
                        value: place.address,
                        isValid: true,
                    },
                },
                true
            );
            setPlaceFound(true);
        } catch (error) {}
    }, []);

    useEffect(() => {
        fetchPlaceData();
    }, [fetchPlaceData, setFormData, sendRequest, placeFound]);

    const placeUpdateSubmitHandler: React.FormEventHandler<HTMLFormElement> =
        async (event) => {
            event.preventDefault();
            try {
                await sendRequest(
                    `http://localhost:5000/api/places/${placeid}`,
                    "PATCH",
                    JSON.stringify({
                        title: formState.inputs.title.value,
                        description: formState.inputs.description.value,
                        address: formState.inputs.address.value,
                    }),
                    { "Content-Type": "application/json" }
                );
                console.log("error");
                history.push(`/${userId}/places`);
            } catch (err) {
                console.log(error);
            }
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

    if (!placeFound) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />

            <form
                action=""
                className="place-form"
                onSubmit={placeUpdateSubmitHandler}
            >
                {/* {isLoading && <LoadingSpinner asOverlay />} */}
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
                    UPDATE PLACE
                </Button>
            </form>
        </React.Fragment>
    );
};

export default UpdatePlace;
