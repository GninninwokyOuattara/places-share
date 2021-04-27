import express from "express";
import { getUsers, logIn, signUp } from "../controllers/users-controllers";

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signUp);

router.post("/login", logIn);

export default router;
