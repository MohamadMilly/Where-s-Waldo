import type { EndSessionResponse } from "@app/types";
import { apiClient } from "../../api/api";
import { useMutation } from "@tanstack/react-query";

const endGame = async ({
  sessionToken,
}: {
  sessionToken: string;
}): Promise<EndSessionResponse> => {
  const response = await apiClient.post("/games/end", {
    sessionToken,
  });
  return response.data;
};

export function useEndGame() {
  return useMutation({
    mutationKey: ["end-game"],
    mutationFn: endGame,
  });
}
