import React from "react";

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
    const [formState, inputHandler] = useForm(
        {
            email: { value: "", isValid: false },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const loginHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form action="" onSubmit={loginHandler}>
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
        </Card>
    );
};

export default Auth;
