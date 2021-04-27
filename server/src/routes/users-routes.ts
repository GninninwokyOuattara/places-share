import express from "express";
import { getUsers, logIn, signUp } from "../controllers/users-controllers";
import { check } from "express-validator";

const router = express.Router();

router.get("/", getUsers);

router.post(
    "/signup",
    [
        check("email").isEmail(),
        check("password").not().isEmpty().isLength({ min: 6 }),
    ],
    signUp
);

router.post(
    "/login",
    [
        check("email").isEmail(),
        check("password").not().isEmpty().isLength({ min: 6 }),
    ],
    logIn
);

export default router;
