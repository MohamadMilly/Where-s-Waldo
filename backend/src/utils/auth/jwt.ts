import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpError } from "../../errors/HttpError.js";

const SECRET_KEY = process.env.SECRET_KEY ?? "Where-s-Waldo-2026";

export function sign(
  payload: Record<string, unknown>,
  options: Record<string, unknown> = {},
): string {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY missing");
  }
  return jwt.sign(payload, SECRET_KEY, options);
}
export function verify<T extends object>(token: string): T & JwtPayload {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      clockTolerance: 999999999,
    }) as unknown as T & JwtPayload;

    return decoded;
  } catch (error) {
    throw new HttpError(401, "Token invalid or expired");
  }
}
