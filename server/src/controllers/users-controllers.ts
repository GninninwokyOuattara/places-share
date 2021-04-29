import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpError from "../models/http-error";

import { User } from "../database/schema/user";

type Controllers = (req: Request, res: Response, next: NextFunction) => void;

export const getUsers: Controllers = async (req, res, next) => {
    const users = await User.find({});
    return res.json(users);
};

export const signUp: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(
            new HttpError("Email already in use, please change it.", 402)
        );
    }

    try {
        user = await User.create(req.body);
        return res.json({ user });
    } catch (error) {
        return next(new HttpError(error.message, 422));
    }
};

export const logIn: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email: email, password: password });
    if (!user) {
        return next(new HttpError("No account found", 400));
    }
    return res.json({ message: "Success", user });
};
