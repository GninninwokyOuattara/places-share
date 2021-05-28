import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { default as jwt } from "jsonwebtoken";
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

    // Hash password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.password, 12);
    } catch (error) {
        return next(
            new HttpError("Could not create account, please try again.", 500)
        );
    }

    try {
        user = await User.create({
            ...req.body,
            password: hashedPassword,
            image: `/upload/images/${req.file.filename}`,
        });

        let token = jwt.sign(
            { user: user._id, email: user.email },
            "supersecret",
            {
                expiresIn: "1h",
            }
        );
        return res.json({
            user: {
                _id: user._id,
                email: user.email,
                token,
            },
        });
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

    let user = await User.findOne({ email: email });
    if (!user) {
        return next(new HttpError("No account found", 400));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(new HttpError("Invalid Credentials", 402));
    }
    let token = jwt.sign({ user: user._id, email: user.email }, "supersecret", {
        expiresIn: "1h",
    });
    return res.json({
        message: "Success",
        user: {
            _id: user._id,
            email: user.email,
            token,
        },
    });
};
