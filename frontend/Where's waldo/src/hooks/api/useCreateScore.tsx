import type { CreateScoreRequestBody, CreateScoreResponse } from "@app/types";
import { apiClient } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createScore = async (
  payload: CreateScoreRequestBody & { sceneId: number },
): Promise<CreateScoreResponse> => {
  const response = await apiClient.post<CreateScoreResponse>(
    `/scenes/${payload.sceneId}/scores`,
    {
      sessionId: payload.sessionId,
      characters: payload.characters,
    },
  );

  return response.data;
};

export function useCreateScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-score"],
    mutationFn: createScore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scores"],
        exact: false,
      });
    },
  });
}
