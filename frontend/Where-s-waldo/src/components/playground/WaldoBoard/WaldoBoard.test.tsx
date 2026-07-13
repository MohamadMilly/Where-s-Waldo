import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WaldoBoard } from "./WaldoBoard";
import userEvent from "@testing-library/user-event";
import type { Character } from "@app/types";

const mockedGuessedCharacter: Character = {
  id: 1,
  name: "WALDO",
  coords: [100, 100],
};

vi.mock("../BoardMenu/BoardMenu", () => {
  return {
    BoardMenu: ({ clickCoords, boardDimensions }) => (
      <div data-testid="board-menu"></div>
    ),
  };
});

const mockScene = {
  id: 1,
  name: "Space Station",
  slug: "space-station",
  imageURL: "",
};

const setIsImageLoaded = vi.fn();

describe("Testing WaldoBoard", () => {
  it("When there's no clickCoords , the boardMenu should not render (before clicking)", () => {
    render(
      <WaldoBoard
        scene={mockScene}
        isLoading={false}
        isImageLoaded={true}
        setIsImageLoaded={setIsImageLoaded}
        isGameRunning={true}
        error={null}
        guessedCharacters={[]}
      />,
    );
    expect(screen.queryByTestId("board-menu")).not.toBeInTheDocument();
  });
  it("When the user clicks on the board the menu must appear", async () => {
    const user = userEvent.setup();
    render(
      <WaldoBoard
        scene={mockScene}
        isLoading={false}
        isImageLoaded={true}
        setIsImageLoaded={setIsImageLoaded}
        isGameRunning={true}
        error={null}
        guessedCharacters={[]}
      />,
    );
    const boardScene = screen.getByTestId("board-scene");
    await user.click(boardScene);

    expect(screen.queryByTestId("board-menu")).toBeInTheDocument();
  });

  it("Put marks on guessed Charatcers When", () => {
    render(
      <WaldoBoard
        scene={mockScene}
        isLoading={false}
        isImageLoaded={true}
        setIsImageLoaded={setIsImageLoaded}
        isGameRunning={true}
        error={null}
        guessedCharacters={[mockedGuessedCharacter]}
      />,
    );
    expect(screen.getByTestId("check-mark")).toBeInTheDocument();
  });

  it("Check marks on guessedCharacters in the correct position", () => {
    render(
      <WaldoBoard
        scene={mockScene}
        isLoading={false}
        isImageLoaded={true}
        setIsImageLoaded={setIsImageLoaded}
        isGameRunning={true}
        error={null}
        guessedCharacters={[mockedGuessedCharacter]}
      />,
    );
    const checkMark = screen.getByTestId("check-mark");
    expect(checkMark).toHaveStyle({
      left: mockedGuessedCharacter.coords[0] / 10 + "%",
      top: mockedGuessedCharacter.coords[1] / 10 + "%",
    });
  });
});
