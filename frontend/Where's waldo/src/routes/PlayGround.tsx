import { useCallback, useEffect, useState } from "react";
import { Timer } from "../components/playground/Timer";
import { WaldoBoard } from "../components/playground/WaldoBoard";
import { GoBackButton } from "../components/shared/GoBackButton";
import { useScene } from "../hooks/api/useScene";
import { useParams } from "react-router";
import type { Character, Scene } from "@app/types";
import { useStartGame } from "../hooks/api/useStartGame";
import { useEndGame } from "../hooks/api/useEndGame";
import { useVerify } from "../hooks/api/useVerify";
import { PlayGroundContext } from "../contexts/PlayGroundContext";
import { CharactersStrip } from "../components/playground/CharactersStrip";
import { WinDialog } from "../components/playground/dialogs/WinDialog";
import { useUser } from "../contexts/UserContext";
import { useCreateScore } from "../hooks/api/useCreateScore";

export function PlayGround() {
  const { slug } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const { scene, isLoading, error: SceneFetchError } = useScene({ slug: slug });
  const [guessedCharacters, setGuessedCharacters] = useState<Character[]>([]);
  const { user } = useUser();
  const { mutate: createScore } = useCreateScore();
  const {
    mutate: start,

    data: gameStartData,
  } = useStartGame();
  const {
    mutate: end,

    data: endGameData,
  } = useEndGame();
  const { mutate: verify } = useVerify();

  const isReadytoStartSession = !isLoading && scene && isImageLoaded; // findout why isStartingPending break the component

  //const isReadyToStartGame: boolean =
  // !isStartingPending && gameStartData?.sessionToken && isReadytoStartSession;
  const isGameEnded: boolean = !!endGameData; // the opposite of isGameEnded is not isGameRunning
  const isGameRunning: boolean = !endGameData && !!gameStartData;
  const guessedAllCharacters: boolean =
    guessedCharacters.length === scene?.characters?.length;

  const hasWon = guessedAllCharacters && duration < 60 * 60 * 2;

  const unGuessedCharacters =
    scene?.characters?.filter((c1) =>
      guessedCharacters.every((c2) => c1.id !== c2.id),
    ) ?? [];

  useEffect(() => {
    if (!isReadytoStartSession) return;
    start();
  }, [isReadytoStartSession, start]);

  useEffect(() => {
    if (gameStartData?.sessionToken && guessedAllCharacters) {
      end({
        sessionToken: gameStartData?.sessionToken,
      });
    }
  }, [
    guessedAllCharacters,
    gameStartData?.sessionToken,
    end,
    guessedCharacters,
    scene?.id,
  ]);
  useEffect(() => {
    if (isGameEnded && user && guessedAllCharacters && endGameData && scene) {
      createScore({
        characters: guessedCharacters,
        sceneId: scene?.id,
        sessionId: endGameData?.session.sessionId,
      });
    }
  }, [
    createScore,
    endGameData,
    guessedAllCharacters,
    isGameEnded,
    guessedCharacters,
    scene,
    user,
  ]);
  const handleVerify = useCallback(
    (characterId: number, coords: number[]) => {
      if (!gameStartData?.sessionToken) return;
      verify(
        {
          characterId,
          coords: coords.map((coord) => Math.floor(coord * 1000)), // 3 digits for accuracy
          sessionToken: gameStartData?.sessionToken,
        },
        {
          onSuccess: (data) => {
            if (data.isValid) {
              setGuessedCharacters((prev) => [
                ...prev,
                data.character as Character,
              ]);
            }
          },
        },
      );
    },
    [verify, gameStartData?.sessionToken],
  );

  return (
    <PlayGroundContext
      value={{ handleVerify, unGuessedCharacters, guessedCharacters }}
    >
      <header className="pt-10 animate-slideDown relative">
        <GoBackButton className="absolute left-4 top-6" />
        <Timer
          duration={duration}
          setDuration={setDuration}
          isGameRunning={isGameRunning}
        />
      </header>
      <CharactersStrip
        guessedCharacters={guessedCharacters}
        characters={scene?.characters ?? []}
        isLoading={isLoading}
        error={SceneFetchError}
      />
      <WaldoBoard
        isGameRunning={isGameRunning}
        isImageLoaded={isImageLoaded}
        setIsImageLoaded={setIsImageLoaded}
        scene={scene as Required<Scene> | null}
        isLoading={isLoading}
        error={SceneFetchError}
        guessedCharacters={guessedCharacters}
      />
      {hasWon && <WinDialog score={duration} />}
    </PlayGroundContext>
  );
}
