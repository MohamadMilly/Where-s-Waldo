import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { WinDialog } from "./WinDialog";
import { MemoryRouter } from "react-router";
import type { JSX } from "react/jsx-runtime";
import type { ComponentType, ReactNode } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../../forms/CreateUserForm/CreateUserForm", () => {
  return {
    CreateUserForm: () => <form data-testid="form"></form>,
  };
});

const mockScore = 20; // in seconds
const mockStoreUser = vi.fn();

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

const renderWinDialogWithContext = (jsx: JSX.Element) =>
  renderWithContext(jsx, ({ children }) => (
    <MemoryRouter initialEntries={["/"]}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  ));

describe("Testing WinDialog", () => {
  it("The Dialog renders on the Screen", () => {
    renderWinDialogWithContext(
      <UserContext
        value={{ user: null, token: null, storeUser: mockStoreUser }}
      >
        <WinDialog score={mockScore} />
      </UserContext>,
    );
    expect(screen.getByTestId("win-dialog")).toBeInTheDocument();
  });
  it("renders the correct score in the correct unit", () => {
    renderWinDialogWithContext(
      <UserContext
        value={{ user: null, token: null, storeUser: mockStoreUser }}
      >
        <WinDialog score={mockScore} />
      </UserContext>,
    );

    expect(screen.getByText(/20s/, { exact: false })).toBeInTheDocument();
  });
  it("renders back button (main menu and scores board)", () => {
    renderWinDialogWithContext(
      <UserContext
        value={{ user: null, token: null, storeUser: mockStoreUser }}
      >
        <WinDialog score={mockScore} />
      </UserContext>,
    );
    expect(
      screen.getByRole("button", { name: /Main menu/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /score/i })).toBeInTheDocument();
  });

  it("When the user does not exist, form should be visible", () => {
    renderWinDialogWithContext(
      <UserContext
        value={{ user: null, token: null, storeUser: mockStoreUser }}
      >
        <WinDialog score={mockScore} />
      </UserContext>,
    );
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
  it("When the user does not exist, form should be visible", () => {
    renderWinDialogWithContext(
      <UserContext
        value={{
          user: { id: 1, name: "Mohammed Milly" },
          token: "some-token",
          storeUser: mockStoreUser,
        }}
      >
        <WinDialog score={mockScore} />
      </UserContext>,
    );
    expect(screen.queryByTestId("form")).not.toBeInTheDocument();
  });
});
