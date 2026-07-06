import type { Request, Response, NextFunction } from "express";
import {
  createSession,
  endSession,
  getSession,
} from "../services/sessionService.js";
import { sign, verify } from "../utils/auth/jwt.js";
import {
  EndSessionResponse,
  verifyCoordsRequestBody,
  VerifyCoordsResponse,
} from "@app/types";
import { HttpError } from "../errors/HttpError.js";
import { checkCoords } from "../services/gameService.js";
import { AuthenticatedRequest } from "../types/index.js";
/* The start controller is responsible for creating a session and a token and send it back to the user,
 */

export const startSessionPost = async (
  req: Request,
  res: Response<{ sessionToken: string }>,
  next: NextFunction,
) => {
  try {
    const session = await createSession();
    const token = sign({ sessionId: session.sessionId }, { expiresIn: "1h" });
    res.json({
      sessionToken: token,
    });
  } catch (err) {
    next(err);
  }
};
/* For ending a game , we should grab the session token, the scene Id and characters with their coords , then i am going to decode the token after that i am going to fetch the scene with characters ids 
then i am going to validate the answers , if they are correct i will end the session and calculate the time then create a score and tie it to the user 
*/

export const endSessionPost = async (
  req: AuthenticatedRequest<{}, unknown, { sessionToken: string }>,
  res: Response<EndSessionResponse>,
  next: NextFunction,
) => {
  const { sessionToken } = req.body;

  try {
    const { sessionId } = verify<{ sessionId: string }>(sessionToken);

    let session = await endSession(sessionId);

    if (!session) {
      throw new HttpError(400, "Cannot end a session that does not exist.");
    }

    res.json({
      session: session,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyCharacterCoordsPost = async (
  req: Request<{}, unknown, verifyCoordsRequestBody>,
  res: Response<VerifyCoordsResponse>,
  next: NextFunction,
) => {
  const { characterId, coords, sessionToken } = req.body;
  try {
    const { sessionId } = verify<{ sessionId: string }>(sessionToken);
    const session = await getSession(sessionId);
    if (!session) {
      throw new HttpError(400, "SessionToken missing");
    }
    const { isValid, character } = await checkCoords(characterId, coords);
    res.json({
      isValid: isValid,
      character: character,
    });
  } catch (err) {
    next(err);
  }
};
