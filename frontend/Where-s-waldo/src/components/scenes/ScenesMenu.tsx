import type { Scene } from "@app/types";
import { SceneCard } from "./SceneCard";
import { Spinner } from "../shared/Spinner";

type ScenesMenuProps = {
  scenes: Required<Scene>[];
  isLoading: boolean;
  error: Error | null;
};

export function ScenesMenu({ scenes, isLoading, error }: ScenesMenuProps) {
  if (isLoading)
    return (
      <p className="text-lg text-purple-400 text-center flex justify-center items-center gap-1">
        <Spinner size={24} />
        <span>Loading</span>
      </p>
    );
  if (error)
    return <p className="text-lg text-red-500">Error: {error.message}</p>;
  return (
    <ul className="flex justify-center md:justify-start flex-wrap w-full mt-10 gap-3 px-3">
      {scenes.map((scene, index) => {
        return (
          <SceneCard
            key={scene.id}
            animationDelay={index * 300}
            scene={scene}
          />
        );
      })}
    </ul>
  );
}
