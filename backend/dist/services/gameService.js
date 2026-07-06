/* NOTE : Coords are percent coords but multiplied by 1000 */
import { HttpError } from "../errors/HttpError.js";
import { prisma } from "../lib/prisma.js";
import { validateCharacterCoords } from "../utils/validateCharacterCoords.js";
import { getScene } from "./scenesService.js";
export async function checkCoords(characterId, coords) {
    const character = await prisma.character.findUnique({
        where: {
            id: characterId,
        },
    });
    if (!character) {
        throw new HttpError(404, "Charatcer does not exist");
    }
    const isValid = validateCharacterCoords(character.coords, coords);
    return { isValid, character: isValid ? character : null };
}
export async function checkWin(sceneId, charactersWithCoords) {
    const scene = (await getScene({ id: sceneId }, { include: { characters: true } }));
    if (!scene) {
        throw new HttpError(404, "Scene does not exist");
    }
    return scene.characters.every((character) => charactersWithCoords.some((answerCharacter) => validateCharacterCoords(character.coords, answerCharacter.coords)));
}
