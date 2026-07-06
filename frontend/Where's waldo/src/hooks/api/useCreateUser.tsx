import type { CreateUserResponse } from "@app/types";
import { apiClient } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserContext";

const createUser = async (name: string): Promise<CreateUserResponse> => {
  const response = await apiClient.post<CreateUserResponse>("/users", {
    name: name,
  });

  return response.data;
};

export function useCreateUser() {
  const { storeUser } = useUser();
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: createUser,
    onSuccess: (data) => {
      storeUser(data.user, data.token);
      apiClient.defaults.headers["authorization"] = `Bearer ${data.token}`;
    },
  });
}
