import express from "express";
import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    getAllPlaces,
    deletePlaceById,
    postPlace,
    updatePlaceById,
} from "../controllers/places-controllers";
import { check } from "express-validator";

const router = express.Router();

router.get("/", getAllPlaces);

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlacesByUserId);

router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("creator").not().isEmpty(),
        check("address").not().isEmpty(),
    ],
    postPlace
);

router.patch(
    "/:pid",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("creator").not().isEmpty(),
        check("address").not().isEmpty(),
    ],
    updatePlaceById
);

router.delete("/:pid", deletePlaceById);

export default router;
