// const express = require("express")
import express from "express";
import HttpError from "../models/http-error";

const router = express.Router();

const DUMMY_PLACES = [
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

router.get("/", (req, res) => {
    res.json({ response: "Index Places route" });
});

router.get("/:pid", async (req, res, next) => {
    const place = DUMMY_PLACES.find((place) => place.id == req.params.pid);

    if (!place) {
        return next(
            new HttpError("No place was found for the provided place id", 404)
        );
    }

    return res.json({ place });
});

router.get("/user/:uid", async (req, res, next) => {
    const user_places = DUMMY_PLACES.filter(
        (place) => place.creator == req.params.uid
    );
    if (!user_places) {
        return next(
            new HttpError("No place was found for the provided user id", 404)
        );
    }

    return res.json({ user_places });
});

export default router;
