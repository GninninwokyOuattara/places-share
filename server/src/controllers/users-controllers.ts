import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error";

type Controllers = (req: Request, res: Response, next: NextFunction) => void;

let DUMMY_USERS = [
    {
        name: "u1",
        email: "u1@mail.com",
        password: "password",
        image: "image",
    },
    {
        name: "u2",
        email: "u1@mail.com",
        password: "pass",
        image: "image",
    },
    {
        name: "u1",
        email: "u1@mail.com",
        password: "pass",
        image: "image",
    },
    {
        name: "u2",
        email: "u1@mail.com",
        password: "pass",
        image: "image",
    },
    {
        name: "u2",
        email: "u1@mail.com",
        password: "pass",
        image: "image",
    },
];

export const getUsers: Controllers = async (req, res, next) => {
    return res.json({ DUMMY_USERS });
};

export const signUp: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    let index = DUMMY_USERS.findIndex((user) => user.email == req.body.email);

    if (index != -1) {
        return next(new HttpError("Email already in use", 500));
    }

    DUMMY_USERS = [...DUMMY_USERS, req.body];
    return res.json({ DUMMY_USERS });
};

export const logIn: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { email, password } = req.body;

    let user = DUMMY_USERS.find(
        (user) => user.email == email && user.password == password
    );
    if (!user) {
        return next(new HttpError("No user found.", 401));
    }
    return res.json({ message: "Logged in successfully" });
};
