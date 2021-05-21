import React, { useState } from "react";

import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
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
    const loginHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <Card className="authentication">
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
                    LOG IN
                </Button>
            </form>
            <Button type="submit" inverse onClick={switchModeHandler}>
                {`SWITCH TO ${isLoginMode ? "REGISTER" : "LOGIN"}`}
            </Button>
        </Card>
    );
};

export default Auth;
