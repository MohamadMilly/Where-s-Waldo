import { HttpError } from "../errors/HttpError.js";
import { AuthenticatedRequest } from "../types/index.js";
import { User } from "@app/types";
import { verify } from "../utils/auth/jwt.js";

import type { NextFunction, Response } from "express";

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.token;
    if (!token) {
      throw new HttpError(401, "Authentication token required");
    }
    console.log(token);
    const authData = verify<User>(token);
    if (authData) {
      req.currentUser = authData;
    }
    next();
  } catch (err: any) {
    if (!err.status) {
      err.status = 401;
    }
    next(err);
  }
}
