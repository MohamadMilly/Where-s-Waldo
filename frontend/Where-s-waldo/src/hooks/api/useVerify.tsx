import { useMutation } from "@tanstack/react-query";
import { verifyCoords } from "../../api/fetchers/verifyCoords";

export function useVerify() {
  return useMutation({
    mutationKey: ["verify-game"],
    mutationFn: verifyCoords,
  });
}
