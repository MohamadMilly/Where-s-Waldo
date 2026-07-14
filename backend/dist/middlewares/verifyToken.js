import { HttpError } from "../errors/HttpError.js";
import { verify } from "../utils/auth/jwt.js";
export function verifyToken(req, res, next) {
  try {
    const token = req.token;
    if (!token) {
      throw new HttpError(401, "Authentication token required");
    }
    console.log(token);
    const authData = verify(token);
    if (authData) {
      req.currentUser = authData;
    }
    next();
  } catch (err) {
    if (!err.status) {
      err.status = 401;
    }
    next(err);
  }
}
