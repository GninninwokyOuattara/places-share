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
import fileUpload from "../controllers/middleware/file-upload";
import authCheck from "../controllers/middleware/auth-check";

const router = express.Router();

router.get("/", getAllPlaces);

router.get("/:pid", getPlaceByPlaceId);

router.get("/user/:uid", getPlacesByUserId);

router.use(authCheck);

router.post(
    "/",
    fileUpload.single("image"),
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
    fileUpload.single("image"),
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty(),
        check("creator").not().isEmpty(),
    ],
    updatePlaceById
);

router.delete("/:pid", deletePlaceById);

export default router;
