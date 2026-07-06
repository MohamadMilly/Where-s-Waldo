import type { User } from "@app/types";
import { createContext, useContext } from "react";

type UserContextType = {
  token: string | null;
  user: User | null;
  storeUser: (user: User, token: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const contextValue = useContext(UserContext);
  if (!contextValue) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return contextValue;
};
