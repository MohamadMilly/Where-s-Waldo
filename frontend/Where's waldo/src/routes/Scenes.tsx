import type { JSX } from "react/jsx-runtime";
import { ScenesMenu } from "../components/scenes/ScenesMenu";
import { PageWrapper } from "../components/shared/PageWrapper";
import { useScenes } from "../hooks/api/useScenes";
import type { Scene } from "@app/types";

export function ScenesPage(): JSX.Element {
  const { scenes, isLoading, error } = useScenes();
  const scenesCount = !isLoading && !error && scenes ? scenes.length : 0;
  return (
    <PageWrapper>
      <h1 className="text-2xl text-purple-700 md:text-4xl mb-4">
        Select a scene
      </h1>
      <p className="text-xs mb-4 text-gray-700 uppercase tracking-widest">
        - {scenesCount} Scenes Available -{" "}
      </p>
      <ScenesMenu
        isLoading={isLoading}
        error={error}
        scenes={scenes as Required<Scene>[]}
      />
    </PageWrapper>
  );
}
