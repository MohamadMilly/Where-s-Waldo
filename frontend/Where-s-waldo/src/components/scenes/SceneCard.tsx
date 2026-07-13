import { RouteLink } from "../ui/RouteLink/RouteLink";
import type { Scene } from "@app/types";

export type SceneCardProps = {
  scene: Required<Scene>;
  animationDelay: number;
};

export function SceneCard({ animationDelay, scene }: SceneCardProps) {
  const imageURL = scene.imageURL;
  const name = scene.name;
  const slug = scene.slug;
  const characters = scene.characters;
  return (
    <article
      style={{
        animationDelay: animationDelay + "ms" || "300ms",
      }}
      className="flex flex-col w-full sm:max-w-55 hover:scale-110 transition-transform duration-300 sm:basis-55 min-h-70 rounded-md px-0.5 animate-slideRight shadow-lg shadow-purple-400/20 border border-gray-300/40 border-dashed"
    >
      <img
        className="w-full h-35 object-center object-cover"
        alt={name}
        src={imageURL}
      />
      <div className="px-2 py-4">
        <h2 className="capitalize text-balance font-sans! font-medium mb-1.5">
          {name}
        </h2>
        <div>
          <h3 className="text-[12px] font-sans! uppercase text-purple-400 mb-0.5">
            {" "}
            Characters{" "}
          </h3>
          <p className="text-xs capitalize mb-3 text-balance text-gray-700">
            {characters
              .map((character) => character.name.toLowerCase())
              .join(" • ")}
          </p>
        </div>
      </div>
      <RouteLink className="text-center mt-auto py-2" route={`/scenes/${slug}`}>
        Start
      </RouteLink>
    </article>
  );
}
