import { prisma } from "../lib/prisma.js";
import { SceneUniqueField, SceneUniqueIdentifier, Score } from "@app/types";

export async function getSceneScores(
  identifier: SceneUniqueIdentifier,
  options: Record<string, unknown>,
) {
  const key = Object.keys(identifier)[0] as SceneUniqueField;
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

export async function createScore(
  userId: number,
  sceneId: number,
  duration: number,
  won: boolean,
  options: Record<string, unknown>,
): Promise<Score> {
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
  } else {
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
