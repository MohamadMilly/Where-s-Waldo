import CharacterWenda from "../../assets/images/Character-Wenda.webp";
import CharacterOdlaw from "../../assets/images/Character-Odlaw.webp";
import CharacterWizard from "../../assets/images/Character-Wizard.webp";
import CharacterWoof from "../../assets/images/Character-Woof.webp";
import CharacterWaldo from "../../assets/images/Character-Waldo.webp";

import type { Character } from "@app/types";
import type { JSX } from "react/jsx-runtime";

const characters_Images: Record<string, string> = {
  WALDO: CharacterWaldo,
  WENDA: CharacterWenda,
  WIZARD: CharacterWizard,
  ODLAW: CharacterOdlaw,
  WOOF: CharacterWoof,
};

type CharactersStrip = {
  characters: Character[];
  isLoading: boolean;
  error: Error | null;
  guessedCharacters: Character[];
};

export function CharactersStrip({
  characters,
  isLoading,
  error,
  guessedCharacters,
}: CharactersStrip): JSX.Element {
  return (
    <div className="overflow-x-auto sticky mt-10 top-0 sm:top-2 z-9999 py-1 px-3">
      {error ? (
        <p className="text-lg">Error: {error.message}</p>
      ) : isLoading ? (
        <p className="text-lg text-purple-400 text-center">Loading...</p>
      ) : (
        <ul className="mx-auto w-fit flex gap-1 justify-center">
          {characters.map((character: Character) => {
            const isGuessed = guessedCharacters.some(
              (c) => c.name === character.name,
            );
            const image: string = characters_Images[character.name];
            return (
              <li
                key={character.id}
                className="shrink-0 p-0.5 flex flex-col gap-1 items-center bg-white shadow shadow-purple-400/40 rounded-xl"
              >
                <div className=" w-23 h-23 overflow-hidden">
                  <img
                    className={`w-full h-auto object-cover object-center ${isGuessed ? "brightness-30" : "brightness-100"}`}
                    src={image}
                    alt={character.name}
                  />
                </div>

                <p
                  className={`capitalize text-sm text-purple-400 ${isGuessed ? "line-through" : ""}`}
                >
                  {character.name.toLowerCase()}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
