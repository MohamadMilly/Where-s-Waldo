import type { Character } from "@app/types";
import { createContext, useContext } from "react";

type PlayGroundContextType = {
  handleVerify: (characterId: number, coords: number[]) => void;
  unGuessedCharacters: Character[];
  guessedCharacters: Character[];
};

export const PlayGroundContext = createContext<PlayGroundContextType | null>(
  null,
);

export const usePlayGround = () => {
  const context = useContext(PlayGroundContext);
  if (!context) {
    throw new Error("usePlayGround must be used within a PlayGroundProvider");
  }
  return context;
};
