import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type JSX,
  type SetStateAction,
} from "react";
import { BoardMenu } from "./BoardMenu";
import type { Character, Scene } from "@app/types";
import { Check } from "lucide-react";
import { Spinner } from "../shared/Spinner";

type WaldoBoardProps = {
  scene: Required<Scene> | null;
  isLoading: boolean;
  error: Error | null;
  isImageLoaded: boolean;
  setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
  isGameRunning: boolean;
  guessedCharacters: Character[];
};

export function WaldoBoard({
  scene,
  isLoading,
  error,
  isImageLoaded,
  setIsImageLoaded,
  isGameRunning,
  guessedCharacters,
}: WaldoBoardProps): JSX.Element {
  const [currentClickCoords, setCurrentClickCoords] = useState<number[] | null>(
    null,
  );
  const [boardDimensions, setBoardDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });
  const boardSceneRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const boardScene = boardSceneRef.current;
    if (boardScene && isImageLoaded) {
      const boardBoundaries = boardScene!.getBoundingClientRect();

      setBoardDimensions({
        width: Math.abs(boardBoundaries.width),
        height: Math.abs(boardBoundaries.height),
      });
    }
  }, [isImageLoaded]);
  useEffect(() => {
    const boardScene = boardSceneRef.current;
    if (!boardScene || !isImageLoaded) return;

    function onClickBoard(e: MouseEvent) {
      const boardBoundaries = boardScene!.getBoundingClientRect();
      const coordsX =
        (e.clientX - boardBoundaries.x + window.screenX) /
        boardBoundaries.width;
      const coordsY =
        (e.clientY - boardBoundaries.y + window.screenY) /
        boardBoundaries.height;

      setCurrentClickCoords([coordsX, coordsY]);
    }

    boardScene.addEventListener("click", onClickBoard);

    return () => boardScene.removeEventListener("click", onClickBoard);
  }, [isImageLoaded, currentClickCoords]);
  if (isLoading)
    return (
      <Spinner
        size={24}
        className="w-full h-full flex justify-center items-center border-4 border-purple-400 rounded-md  sm:w-[calc(100%-2rem)] mx-auto mt-4"
      />
    );
  if (error)
    return (
      <p className="text-lg text-red-500 text-center mt-8">
        Error: {error.message}
      </p>
    );

  if (!scene)
    return (
      <p className="text-lg text-red-500">
        No Scene Available , choose one of the existing ones
      </p>
    );

  const imageURL = scene.imageURL;
  const name = scene.name;
  return (
    <figure className="border-4 relative border-purple-400 rounded-md w-full sm:w-[calc(100%-2rem)] block mx-auto mt-4">
      <div
        className={`relative h-full overflow-x-auto w-full ${isGameRunning ? "cursor-crosshair" : "cursor-not-allowed"}`}
      >
        <div className="w-fit h-fit relative">
          <img
            ref={boardSceneRef}
            onLoad={() => setIsImageLoaded(true)}
            className="h-full w-auto lg:w-full lg:h-auto max-w-none block"
            alt={name}
            src={imageURL}
          />

          {currentClickCoords && isGameRunning && (
            <BoardMenu
              clickCoords={currentClickCoords}
              boardDimensions={boardDimensions}
            />
          )}
          {guessedCharacters.map((c) => {
            return (
              <div
                className="absolute text-white rounded-full w-5 h-5 bg-green-400/80 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: c.coords[0] / 10 + "%",
                  top: c.coords[1] / 10 + "%",
                }}
              >
                <Check className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
