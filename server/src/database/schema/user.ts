import mongoose from "mongoose";
import { Place } from "./place";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

    places: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Place",
        },
    ],
});

export const User = mongoose.model("User", UserSchema);
