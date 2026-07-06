import { prisma } from "../lib/prisma.js";
export async function getAllSecenes(options) {
    const scenes = await prisma.scene.findMany({
        ...options,
    });
    return scenes;
}
export async function getScene(identifier, options) {
    const key = Object.keys(identifier)[0];
    const scene = await prisma.scene.findUnique({
        where: {
            [key]: identifier[key],
        },
        ...options,
    });
    return scene;
}
