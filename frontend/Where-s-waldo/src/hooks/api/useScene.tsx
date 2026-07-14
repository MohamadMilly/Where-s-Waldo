import { useQuery } from "@tanstack/react-query";
import type {
  Character,
  Scene,
  SceneUniqueField,
  SceneUniqueIdentifier,
} from "@app/types";
import { apiClient } from "../../api/api";

export const getScene = async (
  identifier: SceneUniqueIdentifier,
): Promise<{
  scene: Omit<Scene, "characters"> & {
    characters: Omit<Character, "coords">[];
  };
}> => {
  const identifierKey = Object.keys(identifier)[0] as SceneUniqueField;
  const value = identifier[identifierKey];
  const response = await apiClient.get(`/scenes/${identifierKey}/${value}`);

  return response.data;
};

export function useScene(identifier: SceneUniqueIdentifier) {
  const value = Object.values(identifier)[0];
  const { data, isLoading, error } = useQuery({
    queryKey: ["scene", value],
    queryFn: () => getScene(identifier),
    staleTime: 1000 * 60 * 60 * 2,
  });
  const scene = data ? data?.scene : null;

  return { scene, isLoading, error };
}
