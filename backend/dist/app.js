import express from "express";
import cors from "cors";
import "dotenv/config";
import { HttpError } from "./errors/HttpError.js";
import { usersRouter } from "./routes/users.js";
import { gamesRouter } from "./routes/games.js";
import { scenesRouter } from "./routes/scenes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/scenes", scenesRouter);
app.use((req, res, next) => {
    const routeError = new HttpError(404, "Route does not exist.");
    next(routeError);
});
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = "Unexpected Server error has ocurred.";
    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        message: message,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server is running on port ${PORT}...`);
});
