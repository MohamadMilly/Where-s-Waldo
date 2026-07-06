import type { User } from "@app/types";
import { useCallback, useState, type ReactNode } from "react";
import { UserContext } from "../contexts/UserContext";

const rawUser = localStorage.getItem("user");
const storedUser: User | null = rawUser ? JSON.parse(rawUser) : null;

const storedToken: string | null = localStorage.getItem("token");

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(storedUser);
  const [token, setToken] = useState<string | null>(storedToken);

  const storeUser = useCallback((user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, []);
  const contextValue: {
    user: User | null;
    token: string | null;
    storeUser: (user: User, token: string) => void;
  } = {
    user,
    token,
    storeUser,
  };
  return <UserContext value={contextValue}>{children}</UserContext>;
}
