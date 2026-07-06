import type {
  SceneUniqueField,
  SceneUniqueIdentifier,
  Score,
} from "@app/types";
import { apiClient } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

const getSceneScores = async (
  identifier: SceneUniqueIdentifier,
): Promise<{ scores: Required<Score>[] }> => {
  const identifierKey = Object.keys(identifier)[0] as SceneUniqueField;
  const value = identifier[identifierKey];
  const response = await apiClient.get<{ scores: Required<Score>[] }>(
    `/scenes/${identifierKey}/${value}/scores`,
  );

  return response.data;
};

export function useScores(identifier: SceneUniqueIdentifier) {
  const identifierValue = Object.values(identifier)[0];
  const { data, isLoading, error } = useQuery({
    queryKey: ["scores", "scenes", identifierValue],
    queryFn: () => getSceneScores(identifier),
    staleTime: 1000 * 60 * 10,
  });

  const scores = data ? data?.scores : [];

  return { scores, isLoading, error };
}
