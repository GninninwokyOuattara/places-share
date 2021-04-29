import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        lat: {
            type: Number,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        },
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Place = mongoose.model("Place", PlaceSchema);
