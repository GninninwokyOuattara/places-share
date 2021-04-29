import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import { validationResult } from "express-validator";
import { Location } from "../models/location";
import { v4 } from "uuid";

import { Place } from "../database/schema/place";

let DUMMY_PLACES = [
    {
        id: "p1",
        title: "The title",
        description: "The places description",
        location: {
            lat: 40.74,
            long: -73.44,
        },
        address: "20 W 34",
        creator: "u1",
    },
    {
        id: "p2",
        title: "The title",
        description: "The places description",
        location: {
            lat: 40.74,
            long: -73.44,
        },
        address: "20 W 34",
        creator: "u2",
    },
    {
        id: "p3",
        title: "The title",
        description: "The places description",
        location: {
            lat: 40.74,
            long: -73.44,
        },
        address: "20 W 34",
        creator: "u1",
    },
    {
        id: "p4",
        title: "The title",
        description: "The places description",
        location: {
            lat: 40.74,
            long: -73.44,
        },
        address: "20 W 34",
        creator: "u2",
    },
];

type Controllers = (req: Request, res: Response, next: NextFunction) => void;

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
    const place = Place.findOne({ _id: req.body._id });

    if (!place) {
        return next(
            new HttpError("No place was found for the provided place id", 404)
        );
    }

    return res.json({ place });
};

export const getPlacesByUserId: Controllers = async (req, res, next) => {
    const user_places = DUMMY_PLACES.filter(
        (place) => place.creator == req.params.uid
    );

    if (!user_places) {
        return next(
            new HttpError("No place was found for the provided user id", 404)
        );
    }

    return res.json({ user_places });
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
    // const { title, creator, description } = req.body;
    const locationData = newLocation.getLocation();
    // DUMMY_PLACES = [
    //     ...DUMMY_PLACES,
    //     { id: v4(), title, description, ...locationData, creator },
    // ];
    let place = await Place.create({ ...req.body, ...locationData });

    // let p = new Place({ ...req.body, ...locationData });
    res.status(201).json({
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

    let index = DUMMY_PLACES.findIndex((place) => place.id == req.params.pid);
    if (index == -1) {
        return next(new HttpError("No place found with the provided id", 400));
    }

    if (req.body.address !== DUMMY_PLACES[index].address) {
        let newLocation = new Location(req.body.address);
        await newLocation.getGeometry();
        req.body = { ...DUMMY_PLACES[index], ...newLocation.getLocation() };
    }

    DUMMY_PLACES[index] = req.body;
    return res
        .status(200)
        .json({ message: "Place updated successfully", DUMMY_PLACES });
};

export const deletePlaceById: Controllers = async (req, res, next) => {
    let places_id: string[] = [];

    let index = DUMMY_PLACES.findIndex((place) => place.id == req.params.pid);
    if (index == -1) {
        return next(new HttpError("No place found with the provided id", 404));
    }

    DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== req.params.pid);
    return res.json({ message: "Place successfully deleted", DUMMY_PLACES });
};
