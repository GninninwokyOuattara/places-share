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
        default:
            "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
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
