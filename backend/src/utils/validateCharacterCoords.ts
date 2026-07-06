export function validateCharacterCoords(
  correctCoords: number[],
  answerCoords: number[],
): boolean {
  const xCoordsDiff = Math.abs(correctCoords[0] - answerCoords[0]);
  const yCoordsDiff = Math.abs(correctCoords[1] - answerCoords[1]);
  if (xCoordsDiff <= 15 && yCoordsDiff <= 15) {
    return true;
  } else {
    return false;
  }
}
