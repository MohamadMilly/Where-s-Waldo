import type { Request, Response, NextFunction } from "express";
import { User } from "@app/types";
import { prisma } from "../lib/prisma.js";
import { sign } from "../utils/auth/jwt.js";

export const createUserPost = async (
  req: Request<{}, unknown, { name: string }>,
  res: Response<{ token: string; user: User }>,
  next: NextFunction,
) => {
  const { name } = req.body;
  
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
      },
    });
    const token = sign(user);
    res.json({
      user: user,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
