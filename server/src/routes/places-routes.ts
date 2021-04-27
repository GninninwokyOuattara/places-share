import express from "express";
import {
    getPlaceByPlaceId,
    getPlacesByUserId,
    getAllPlaces,
    deletePlaceById,
    postPlace,
    updatePlaceById,
} from "../controllers/places-controllers";
// import HttpError from "../models/http-error";

const router = express.Router();

router.get("/", getAllPlaces);

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlacesByUserId);

router.post("/", postPlace);

router.patch("/:pid", updatePlaceById);

router.delete("/:pid", deletePlaceById);

export default router;
