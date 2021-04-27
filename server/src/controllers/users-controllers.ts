import { Request, Response, NextFunction } from "express";
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
    if (!Object.keys(req.body).length) {
        return next(new HttpError("No body provided", 500));
    }
    DUMMY_USERS = [...DUMMY_USERS, req.body];
    return res.json({ DUMMY_USERS });
};

export const logIn: Controllers = async (req, res, next) => {
    const { email, password } = req.body;

    let user = DUMMY_USERS.find(
        (user) => user.email == email && user.password == password
    );
    if (!user) {
        return next(new HttpError("No user found.", 401));
    }
    return res.json({ message: "Logged in successfully" });
};
