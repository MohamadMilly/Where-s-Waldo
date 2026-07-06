import { prisma } from "../lib/prisma.js";
export async function getSceneScores(identifier, options) {
    const key = Object.keys(identifier)[0];
    const scores = await prisma.score.findMany({
        where: {
            scene: {
                [key]: identifier[key],
            },
            won: true,
        },
        ...options,
    });
    return scores;
}
export async function createScore(userId, sceneId, duration, won, options) {
    let score = await prisma.score.findUnique({
        where: {
            sceneId_userId: {
                sceneId: sceneId,
                userId: userId,
            },
        },
    });
    if (score && duration < score.duration) {
        score = await prisma.score.update({
            where: {
                sceneId_userId: {
                    sceneId: sceneId,
                    userId: userId,
                },
            },
            data: {
                duration: duration,
            },
        });
    }
    else {
        score = await prisma.score.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                scene: {
                    connect: {
                        id: sceneId,
                    },
                },
                duration: duration,
                won: won,
            },
            ...options,
        });
    }
    return score;
}
