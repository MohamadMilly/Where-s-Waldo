import { useMutation } from "@tanstack/react-query";
import type { verifyCoordsRequestBody, VerifyCoordsResponse } from "@app/types";
import { apiClient } from "../../api/api";

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

export function useVerify() {
  return useMutation({
    mutationKey: ["verify-game"],
    mutationFn: verifyCoords,
  });
}
