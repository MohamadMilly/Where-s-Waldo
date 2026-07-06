import express from "express";
import { createUserPost } from "../controllers/usersController.js";
export const usersRouter = express.Router();
usersRouter.post("/", createUserPost);
