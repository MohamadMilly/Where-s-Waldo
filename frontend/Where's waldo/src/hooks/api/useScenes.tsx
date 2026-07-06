import type { AxiosResponse } from "axios";
import { apiClient } from "../../api/api";
import type { Scene } from "@app/types";
import { useQuery } from "@tanstack/react-query";

const getScenes = async (): Promise<{ scenes: Scene[] }> => {
  const response: AxiosResponse<{ scenes: Scene[] }> = await apiClient.get<{
    scenes: Scene[];
  }>("/scenes");

  return response.data;
};

export function useScenes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["scenes"],
    queryFn: getScenes,
    staleTime: 1000 * 60 * 30,
  });
  const scenes = data ? data?.scenes : [];

  return { scenes, isLoading, error };
}
