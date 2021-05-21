import React, { useReducer, useCallback } from "react";

const formReducer = (state: any, action: any) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        case "UPDATE_FORM":
            return {
                inputs: action.initialState,
                isValid: action.initialValidity,
            };
        default:
            return state;
    }
};

const useForm = (
    initialState: {
        [key: string]: { value: string; isValid: boolean };
    },
    initialValid: boolean
) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialState,
        isValid: initialValid,
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: "INPUT_CHANGE", value, id, isValid, inputId: id });
    }, []);

    const setFormData = useCallback((initialState, initialValidity) => {
        dispatch({ type: "UPDATE_FORM", initialState, initialValidity });
    }, []);

    return [formState, inputHandler, setFormData];
};

export default useForm;
