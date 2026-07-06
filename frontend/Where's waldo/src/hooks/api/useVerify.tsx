import type { verifyCoordsRequestBody, VerifyCoordsResponse } from "@app/types";
import { apiClient } from "../../api/api";
import { useMutation } from "@tanstack/react-query";

const verifyCoords = async ({
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
