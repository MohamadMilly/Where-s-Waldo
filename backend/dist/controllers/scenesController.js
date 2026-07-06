import { getAllSecenes, getScene } from "../services/scenesService.js";
import { HttpError } from "../errors/HttpError.js";
import { createScore, getSceneScores } from "../services/scoresService.js";
import { getSession } from "../services/sessionService.js";
import { checkWin } from "../services/gameService.js";
export const getAllScenesGet = async (req, res, next) => {
    try {
        const scenes = await getAllSecenes({
            include: {
                characters: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        res.json({
            scenes,
        });
    }
    catch (err) {
        next(err);
    }
};
export const getSpecificSceneGet = async (req, res, next) => {
    const { slug, id } = req.params;
    let scene;
    const options = {
        include: {
            characters: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    };
    try {
        if (slug) {
            scene = await getScene({ slug: slug }, options);
        }
        if (id) {
            scene = await getScene({ id: JSON.parse(id) }, options);
        }
        if (!scene) {
            throw new HttpError(404, "Scene is not found.");
        }
        res.json({ scene: scene });
    }
    catch (err) {
        next(err);
    }
};
export const getSceneScoresGet = async (req, res, next) => {
    const { id, slug } = req.params;
    const options = {
        include: {
            user: true,
        },
        orderBy: {
            duration: "asc",
        },
    };
    let scores;
    try {
        if (slug) {
            scores = await getSceneScores({ slug: slug }, options);
        }
        if (id) {
            scores = await getSceneScores({ id: JSON.parse(id) }, options);
        }
        if (!scores) {
            throw new HttpError(404, "Scores for this scene are not found.");
        }
        res.json({
            scores: scores,
        });
    }
    catch (err) {
        next(err);
    }
};
export const createScorePost = async (req, res, next) => {
    const { sessionId, characters } = req.body;
    const { id: sceneId } = req.params;
    const currentUser = req.currentUser;
    try {
        if (!currentUser) {
            throw new HttpError(401, "Current User Object is required.");
        }
        const session = await getSession(sessionId);
        if (!session || !session.completed) {
            throw new HttpError(400, "Session does not exist or not completed.");
        }
        const sessionDuration = new Date(session.endTime).getTime() -
            new Date(session.startTime).getTime();
        const allCoordsCorrect = await checkWin(JSON.parse(sceneId), characters);
        const hasWon = allCoordsCorrect && sessionDuration < 1000 * 60 * 60 * 2;
        const score = await createScore(currentUser.id, JSON.parse(sceneId), sessionDuration, hasWon, {
            include: {
                user: true,
            },
        });
        res.json({
            score: score,
            hasWon: hasWon,
        });
    }
    catch (err) {
        next(err);
    }
};
