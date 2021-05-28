import jwt from "jsonwebtoken";
import HttpError from "../../models/http-error";

import { Request, Response, NextFunction } from "express";

type RequestExtended = Request & {
    userData?: { _id: string; email: string };
};

const authCheck = (req: RequestExtended, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (token) {
            const decodedData = jwt.verify(token, "supersecret");
            req.userData = {
                _id: (decodedData as { user: string }).user,
                email: (decodedData as { email: string }).email,
            };
            next();
        } else {
            throw new Error();
        }
    } catch (error) {
        next(new HttpError("Authentification failed", 401));
    }
};

export default authCheck;
