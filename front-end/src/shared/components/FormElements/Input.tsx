import React, { useReducer, useEffect } from "react";

import { validate } from "../../util/validators";
import "./Input.css";

const inputReducer = (
    state: { value: string; isValid: boolean; isTouched: boolean },
    action: {
        type: string;
        val: string;
        validators: { type: string; val?: number }[];
    }
) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        case "TOUCH": {
            return {
                ...state,
                isTouched: true,
            };
        }
        default:
            return state;
    }
};

const Input: React.FC<{
    element?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    rows?: number;
    label?: string;
    errorText?: string;
    validators: { type: string; val?: number }[];
    onInput: (id: string, value: string, isValid: boolean) => void;
    value?: string;
    valid?: boolean;
}> = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        isValid: props.valid || false,
        value: props.value || "",
        isTouched: false,
    });

    const changeHandler: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        dispatch({
            type: "CHANGE",
            val: event.target.value,
            validators: props.validators,
        });
    };

    const touchHandler: React.FocusEventHandler = (event) => {
        return dispatch({
            type: "TOUCH",
            val: inputState.value,
            validators: props.validators,
        });
    };

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id!, value, isValid);
    }, [id, value, isValid, onInput]);

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        );

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                "form-control--invalid"
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && (
                <p>{props.errorText}</p>
            )}
        </div>
    );
};

export default Input;
