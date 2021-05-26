import fs from "fs";
import express from "express";
import cors from "cors";
import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./models/http-error";

require("./database/mongoose");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/places/", placesRoutes);
app.use("/api/users/", usersRoutes);

// Middleware to handle unknow route
// Which will then be catch by our default error handler below
app.use((req, res, next) => {
    next(new HttpError("Could not find this endpoint", 404));
});

// Error handling middleware
app.use(
    (
        error: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (res.headersSent) {
            return next(error);
        }
        // Due to multer returning a error object with code property as string
        if (req.file) {
            console.log(req.body);
            fs.unlinkSync(req.file.path);
        }
        if (typeof error.code === "string") {
            res.status(500);
            return res.json({ message: error.code });
        }
        res.status(error.code || 500);
        res.json({ message: error.message });
    }
);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
