import { Prisma } from "../generated/prisma/browser.js";
import { prisma } from "../lib/prisma.js";
import { Scene, SceneUniqueField, SceneUniqueIdentifier } from "@app/types";

export async function getAllSecenes(
  options: Prisma.SceneFindManyArgs,
): Promise<Scene[]> {
  const scenes = await prisma.scene.findMany({
    ...options,
  });
  return scenes;
}

export async function getScene(
  identifier: SceneUniqueIdentifier,
  options: Record<string, unknown>,
): Promise<Scene | null> {
  const key = Object.keys(identifier)[0] as SceneUniqueField;
  const scene: Scene | null = await prisma.scene.findUnique({
    where: {
      [key]: identifier[key],
    } as any,
    ...options,
  });
  return scene;
}
