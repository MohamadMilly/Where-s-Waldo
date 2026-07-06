import type { Scene } from "@app/types";
import { ScenesBarNavLink } from "./ScenesBarNavLink";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export function ScenesBarContent({ scenes }: { scenes: Scene[] }) {
  return (
    <ul className="flex items-center w-full overflow-x-auto">
      {scenes.map((scene) => {
        const sceneName = scene.name;
        const sceneSlug = scene.slug;
        return (
          <li className="min-w-40" key={scene.id}>
            <ScenesBarNavLink name={sceneName} slug={sceneSlug} />
          </li>
        );
      })}
    </ul>
  );
}
type ScenesBarProps = {
  scenes: Scene[];
  isLoading: boolean;
  error: Error | null;
};

export function ScenesBar({ scenes, isLoading, error }: ScenesBarProps) {
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    if (scenes && scenes.length > 0 && !slug) {
      navigate(`/scoresboard/${scenes[0].slug}`);
    }
  }, [navigate, scenes, slug]);

  if (isLoading) return <p className="text-purple-400 text-lg">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-lg">Error: {error.message}</p>;

  return (
    <nav className="h-fit border-b-2 border-gray-200/50 w-full">
      <ScenesBarContent scenes={scenes} />
    </nav>
  );
}
