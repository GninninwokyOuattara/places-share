import React, { useState, useContext } from "react";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import useHttpClient from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const { login, userToken } = useContext(AuthContext) as {
        login: (userId: string, userToken: string) => void;
        userToken: string | null;
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<null | string>(null);
    const [isLoading, error, sendRequest, clearError] = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: { value: "", isValid: false },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const switchModeHandler = () => {
        if (isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                    image: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        } else {
            setFormData(
                {
                    email: formState.inputs.email,
                    password: formState.inputs.password,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        }
        setIsLoginMode((currMode) => !currMode);
    };

    const loginHandler: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        if (isLoginMode) {
            try {
                const { user } = await sendRequest(
                    `${process.env.REACT_APP_BACKEND}/users/login`,
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    { "Content-Type": "application/json" }
                );

                login(user._id, user.token);
            } catch (error) {}
        } else {
            try {
                const formData = new FormData();
                formData.append("name", formState.inputs.name.value);
                formData.append("email", formState.inputs.email.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("image", formState.inputs.image.value);

                const { user } = await sendRequest(
                    `${process.env.REACT_APP_BACKEND}/users/signup`,
                    "POST",
                    formData
                );
                login(user._id, user.token);
            } catch (error) {}
        }
    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form action="" onSubmit={loginHandler}>
                    {!isLoginMode && (
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="You must provide a name"
                            value={formState.inputs.name.value}
                            valid={formState.inputs.name.isValid}
                            onInput={inputHandler}
                        />
                    )}
                    {!isLoginMode && (
                        <ImageUpload id="image" center onInput={inputHandler} />
                    )}
                    <Input
                        id="email"
                        element="input"
                        type="text"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(8)]}
                        errorText="Password must be at least 8 characters long"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {`${isLoginMode ? "LOGIN" : "SIGNUP"}`}
                    </Button>
                </form>
                <Button type="submit" inverse onClick={switchModeHandler}>
                    {`SWITCH TO ${isLoginMode ? "SIGNUP" : "LOGIN"}`}
                </Button>
            </Card>
        </React.Fragment>
    );
};

export default Auth;
