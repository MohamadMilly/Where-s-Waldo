import type { VerifyCoordsResponse, verifyCoordsRequestBody } from "@app/types";
import { apiClient } from "../api";

export const verifyCoords = async ({
  characterId,
  coords,
  sessionToken,
}: verifyCoordsRequestBody): Promise<VerifyCoordsResponse> => {
  const response = await apiClient.post("/games/verify", {
    characterId,
    coords,
    sessionToken,
  });
  
  return response.data;
};
