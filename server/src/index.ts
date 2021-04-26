import express from "express";
import cors from "cors";
import placesRoutes from "./routes/places-routes";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/places/", placesRoutes);

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
        res.status(error.code || 500);
        res.json({ message: error.message });
    }
);

app.get("*", async (req, res) => {
    res.json({ status: "Running" });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
