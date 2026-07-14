import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePlayGround } from "../contexts/PlayGroundContext";
import {
  useEffect,
  type ComponentType,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "../contexts/UserContext";
import { PlayGround } from "../routes/PlayGround";
import userEvent from "@testing-library/user-event";
import { useScene } from "../hooks/api/useScene";
import type { Character } from "@app/types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
function renderWithContext(
  jsx: JSX.Element,
  Context: ComponentType<{ children: ReactNode }>,
) {
  return render(<Context>{jsx}</Context>);
}
const renderPlayGroundWithContext = (jsx: JSX.Element) =>
  renderWithContext(jsx, ({ children }) => (
    <MemoryRouter initialEntries={["/scenes/space-station"]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  ));

const mockedSceneHookResult = {
  scene: {
    id: 1,
    name: "Space Station",
    slug: "space-station",
    imageURL: "#",
    characters: [
      { id: 1, name: "WALDO" },
      { id: 2, name: "WENDA" },
    ],
  },
  isLoading: false,
  error: null,
};
vi.mock("../hooks/api/useScene", () => ({
  useScene: vi.fn(),
}));

vi.mock("../hooks/api/useStartGame", () => ({
  useStartGame: () => ({
    mutate: vi.fn(),
    data: { sessionToken: "SOME_TOKEN" },
  }),
}));

const mockEndGameConfig = {
  mutate: vi.fn(),
  data: null as unknown,
};

vi.mock("../hooks/api/useEndGame", () => ({
  useEndGame: () => ({
    mutate: mockEndGameConfig.mutate,
    data: mockEndGameConfig.data,
  }),
}));

vi.mock("../hooks/api/useCreateScore", () => ({
  useCreateScore: () => ({ mutate: vi.fn() }),
}));

const results: {
  [key: number]: { isValid: boolean; character: Character | null };
} = {
  1: {
    isValid: true,
    character: { id: 1, name: "WALDO", coords: [100, 100] },
  },
  2: {
    isValid: false,
    character: null,
  },
};

const giveuseVerifyMutationCallBack = (result: {
  isValid: boolean;
  character: Character | null;
}) => {
  return (
    { characterId }: { characterId: number },
    options: { onSuccess: (data: unknown) => void },
  ) => {
    if (options?.onSuccess) {
      options.onSuccess(result);
    }
  };
};

const mockMutate = vi.fn();

vi.mock("../hooks/api/useVerify", () => {
  return {
    useVerify: () => ({
      mutate: mockMutate,
    }),
  };
});

vi.mock("../components/playground/Timer/Timer", () => {
  return { Timer: () => <div>Timer</div> };
});

vi.mock("../components/playground/WaldoBoard/WaldoBoard", () => {
  return {
    WaldoBoard: ({
      setIsImageLoaded,
      isGameRunning,
    }: {
      setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
      isGameRunning: boolean;
    }) => {
      const { handleVerify, unGuessedCharacters } = usePlayGround();
      useEffect(() => {
        setIsImageLoaded(true);
      }, [setIsImageLoaded]);

      return (
        <div data-testid="waldo-board">
          {isGameRunning ? (
            unGuessedCharacters.map((c) => {
              return (
                <button onClick={() => handleVerify(c.id, [0.1, 0.1])}>
                  {c.name.toLowerCase()}
                </button>
              );
            })
          ) : (
            <p>Game is not running</p>
          )}
        </div>
      );
    },
  };
});

vi.mock("../components/playground/CharactersStrip", () => {
  return {
    CharactersStrip: () => <div>Characters images and names</div>,
  };
});

vi.mock("../components/playground/dialogs/WinDialog/WinDialog", () => {
  return {
    WinDialog: () => <div data-testid="win-dialog">WinDialog</div>,
  };
});

beforeAll(() => {
  window.Audio = vi.fn().mockImplementation(() => ({
    play: vi.fn().mockResolvedValue(undefined),
    pause: vi.fn(),
  }));
});

describe("Testing PlayGround after mocking the mutation , queries and child components", () => {
  it("When clicking on Waldo button , it should remove it from boardMenu", async () => {
    const user = userEvent.setup();
    vi.mocked(useScene).mockReturnValue(mockedSceneHookResult);
    mockMutate.mockImplementation(giveuseVerifyMutationCallBack(results[1]));
    renderPlayGroundWithContext(
      <UserContext value={{ user: null, token: null, storeUser: () => {} }}>
        <PlayGround />
      </UserContext>,
    );
    const waldoButtonSelection = await screen.findByRole("button", {
      name: "waldo",
    });
    await user.click(waldoButtonSelection);
    expect(
      screen.queryByRole("button", { name: /waldo/i }),
    ).not.toBeInTheDocument();
  });
  it("if isValid is false , then the button should not be deleted from the boardMenu", async () => {
    const user = userEvent.setup();
    mockMutate.mockImplementation(giveuseVerifyMutationCallBack(results[2]));
    vi.mocked(useScene).mockReturnValue(mockedSceneHookResult);
    renderPlayGroundWithContext(
      <UserContext value={{ user: null, token: null, storeUser: () => {} }}>
        <PlayGround />
      </UserContext>,
    );
    const waldoButtonSelection = await screen.findByRole("button", {
      name: "wenda",
    });
    await user.click(waldoButtonSelection);
    expect(
      screen.queryByRole("button", { name: /wenda/i }),
    ).toBeInTheDocument();
  });
  it("When the scene is loading, The game is not running", () => {
    vi.mocked(useScene).mockReturnValue({
      ...mockedSceneHookResult,
      isLoading: true,
      scene: null,
    });
    renderPlayGroundWithContext(
      <UserContext value={{ user: null, token: null, storeUser: () => {} }}>
        <PlayGround />
      </UserContext>,
    );
    expect(screen.getByText(/is not running/i)).toBeInTheDocument();
  });

  it("When guessing all characters correctly , isGameRunnig is false (like the previous test) and a dialog is visible", async () => {
    const user = userEvent.setup();
    vi.mocked(useScene).mockReturnValue(mockedSceneHookResult);

    renderPlayGroundWithContext(
      <UserContext value={{ user: null, token: null, storeUser: () => {} }}>
        <PlayGround />
      </UserContext>,
    );

    const waldoButtonSelection = await screen.findByRole("button", {
      name: "waldo",
    });

    mockMutate.mockImplementation(giveuseVerifyMutationCallBack(results[1]));
    await user.click(waldoButtonSelection);

    mockMutate.mockClear();

    mockMutate.mockImplementation(
      giveuseVerifyMutationCallBack({
        isValid: true,
        character: { id: 2, name: "WENDA", coords: [200, 200] },
      }),
    );

    mockEndGameConfig.data = { session: "Mocked Session" };

    const wendaButtonSelection = await screen.findByRole("button", {
      name: "wenda",
    });
    await user.click(wendaButtonSelection);

    expect(screen.getByText(/is not running/i)).toBeInTheDocument();
    expect(screen.getByTestId("win-dialog")).toBeInTheDocument();
  });
});
