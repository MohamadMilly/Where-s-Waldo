import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Character } from "@app/types";
import { BoardMenu } from "./BoardMenu";
import { PlayGroundContext } from "../../../contexts/PlayGroundContext";
import userEvent from "@testing-library/user-event";


const characters: Omit<Character, "coords">[] = [
  {
    id: 1,
    name: "WALDO",
  },
  {
    id: 2,
    name: "WENDA",
  },
  {
    id: 3,
    name: "WIZARD",
  },
  {
    id: 4,
    name: "WOOF",
  },
  {
    id: 5,
    name: "ODLAW",
  },
];

describe("Testing BoardMenu Component", () => {
  it("Board Menu renders within a mock board", () => {
    const handleVerifyMock = vi.fn();
    render(
      <PlayGroundContext
        value={{
          unGuessedCharacters: characters,
          guessedCharacters: [],
          handleVerify: handleVerifyMock,
        }}
      >
        <BoardMenu
          clickCoords={[0.5, 0.5]}
          boardDimensions={{ width: 1000, height: 1000 }}
        />
        ,
      </PlayGroundContext>,
    );
    const boardMenu = screen.getByTestId("board-menu");
    expect(boardMenu).toBeInTheDocument();
    const charactersItems = screen.getAllByTestId("character-menu-item");
    characters.forEach((c, index) => {
      expect(charactersItems[index].textContent.toLowerCase()).toBe(
        c.name.toLowerCase(),
      );
    });
  });
  it("Board Menu renders in the correct position in the board (container)", () => {
    const handleVerifyMock = vi.fn();
    render(
      <PlayGroundContext
        value={{
          unGuessedCharacters: characters,
          guessedCharacters: [],
          handleVerify: handleVerifyMock,
        }}
      >
        <BoardMenu
          clickCoords={[0.5, 0.5]}
          boardDimensions={{ width: 1000, height: 1000 }}
        />
      </PlayGroundContext>,
    );

    const boardMenu = screen.getByTestId("board-menu");
    // 1.5% range of 1000 is 15px
    expect(boardMenu).toHaveStyle({
      left: "calc(50% - 15px)",
      top: "calc(50% - 15px)",
    });
  });
  it("handle verify should be called when clicking on a characters item", async () => {
    const user = userEvent.setup();
    const handleVerifyMock = vi.fn();

    render(
      <PlayGroundContext
        value={{
          unGuessedCharacters: characters,
          guessedCharacters: [],
          handleVerify: handleVerifyMock,
        }}
      >
        <BoardMenu
          clickCoords={[0.5, 0.5]}
          boardDimensions={{ width: 1000, height: 1000 }}
        />
        ,
      </PlayGroundContext>,
    );
    await user.click(screen.getByRole("button", { name: "waldo" }));
    expect(handleVerifyMock).toHaveBeenCalled();
  });
});
