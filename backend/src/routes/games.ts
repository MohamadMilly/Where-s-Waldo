import express from "express";

import {
  endSessionPost,
  startSessionPost,
  verifyCharacterCoordsPost,
} from "../controllers/sessionsController.js";

export const gamesRouter = express.Router();

gamesRouter.post("/start", startSessionPost);

// this is for users to help them find characters, but if they found characters in one hit (like accessing the api from postman or whatever)

gamesRouter.post("/verify", verifyCharacterCoordsPost);

gamesRouter.post("/end", endSessionPost);
