import mongoose from "mongoose";
import { User } from "./schema/user";

const Schema = mongoose.Schema;

mongoose
    .connect(process.env.DATABASE_URL as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connection to database done successfully !"))
    .catch((error) => {
        throw error.message;
    });
