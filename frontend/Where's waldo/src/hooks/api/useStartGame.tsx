import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/api";

const startGame = async (): Promise<{ sessionToken: string }> => {
  const response = await apiClient.post<{ sessionToken: string }>(
    "/games/start",
  );

  return response.data;
};

export function useStartGame() {
  return useMutation({
    mutationKey: ["start-game"],
    mutationFn: startGame,
  });
}
