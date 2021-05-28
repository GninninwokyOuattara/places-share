import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import { validationResult } from "express-validator";
import { Location } from "../models/location";
import { v4 } from "uuid";
import mongoose, { Mongoose } from "mongoose";
import fs from "fs";
import path from "path";
import { Place } from "../database/schema/place";
import { User } from "../database/schema/user";

type RequestExtended = Request & {
    userData?: { _id: string; email: string };
};
type Controllers = (
    req: RequestExtended,
    res: Response,
    next: NextFunction
) => void;

interface PostBody {
    id: string;
    title: string;
    description: string;
    location: {
        lat: number;
        long: number;
    };
    address: string;
    creator: string;
}

export const getAllPlaces: Controllers = async (req, res, next) => {
    const places = await Place.find({});
    res.json({ places });
};

export const getPlaceByPlaceId: Controllers = async (req, res, next) => {
    try {
        const place = await Place.findOne({ _id: req.params.pid });

        if (!place) {
            return next(
                new HttpError(
                    "No place was found for the provided place id",
                    404
                )
            );
        }

        return res.json({ place });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export const getPlacesByUserId: Controllers = async (req, res, next) => {
    try {
        let places = await Place.find({ creator: req.params.uid });
        if (!places.length) {
            return next(new HttpError("No places found for this user", 422));
        }
        return res.json({ places });
    } catch (error) {
        return next(new HttpError("Unexpected Error", 500));
    }
};

export const postPlace: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }
    let newLocation = new Location(req.body.address);
    await newLocation.getGeometry();
    if (newLocation.error) {
        return next(new HttpError("Location provided not found", 404));
    }
    const locationData = newLocation.getLocation();
    let place;
    let user;
    place = new Place({
        ...req.body,
        ...locationData,
        image: `/upload/images/${req.file.filename}`,
    });

    try {
        user = await User.findById(req.body.creator);
        if (!user) {
            return next(
                new HttpError("Could not find user for provided Id", 404)
            );
        }
    } catch (error) {
        return next(new HttpError("Could not find user for provided Id", 404));
    }

    if (
        !req.userData ||
        req.userData.email !== user.email ||
        req.userData._id !== user._id.toString()
    ) {
        return next(new HttpError("Access Denied", 403));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.save({ session: sess });
        user.places.push(place);
        await user.save({ session: sess });
        sess.commitTransaction();
    } catch (error) {
        return next(
            new HttpError("Could not create place, please try again...", 500)
        );
    }

    return res.status(201).json({
        message: "Place successfully added",
        place,
    });
};

export const updatePlaceById: Controllers = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    let place = await Place.findById(req.params.pid);
    if (!place) {
        return next(new HttpError("Could not find place", 404));
    }

    let newLocation = new Location(req.body.address);
    await newLocation.getGeometry();
    if (newLocation.error) {
        return next(new HttpError("Location provided not found", 404));
    }

    const locationData = newLocation.getLocation();
    let updatedPlace = {
        ...req.body,
        ...locationData,
        image: `${
            req.file ? "/upload/images/" + req.file.filename : place.image
        }`,
    };

    // Find place creator
    let user = await User.findById(place.creator);
    if (!user) {
        throw new HttpError("Place creator no found", 404);
    }

    //verify he is correctly authentificated
    if (
        !req.userData ||
        req.userData.email !== user.email ||
        req.userData._id !== user._id.toString()
    ) {
        return next(new HttpError("Access Denied", 403));
    }

    try {
        // Deleting previous image
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, `../../src${place.image}`));
        }
        place.title = updatedPlace.title;
        place.description = updatedPlace.description;
        place.address = updatedPlace.address;
        place.image = updatedPlace.image;
        await place.save();
    } catch (error) {
        return next(
            new HttpError("Could not update place, please try again.", 521)
        );
    }

    return res.json({ message: "Update completed.", place });
};

export const deletePlaceById: Controllers = async (req, res, next) => {
    const sess = await mongoose.startSession();
    let place: any;
    let user: any;
    try {
        sess.startTransaction();
        place = await Place.findById(req.params.pid);
        if (!place) {
            return next(new HttpError("Place not found", 404));
        }
        place.remove({ session: sess });
        fs.unlinkSync(path.join(__dirname, `../../src${place.image}`));
        user = await User.findById(place.creator);

        if (!user) {
            throw new HttpError("Place creator no found", 404);
        }

        //verify he is correctly authentificated
        if (
            !req.userData ||
            req.userData.email !== user.email ||
            req.userData._id !== user._id.toString()
        ) {
            return next(new HttpError("Access Denied", 403));
        }

        user.places.pull(req.params.pid);
        user.save();
        sess.commitTransaction();
    } catch (error) {
        return next(
            new HttpError("Could not complete deletion, please try again.", 502)
        );
    }

    return res.json({
        message: "Place succesfully deleted",
        place,
    });
};
