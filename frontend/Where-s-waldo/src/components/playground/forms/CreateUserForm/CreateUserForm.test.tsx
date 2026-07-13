import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreateUserForm } from "./CreateUserForm";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react/jsx-runtime";

const mockOnSubmit = vi.fn();
const mockOnNameChange = vi.fn();

function setup(jsx: JSX.Element) {
  return {
    ...render(jsx),
    user: userEvent.setup(),
  };
}

afterEach(() => {
  vi.resetAllMocks();
});

describe("Testing Create User Form", () => {
  it("form renders", () => {
    render(
      <CreateUserForm
        isPendingCreatingUser={false}
        error={null}
        onNameChange={mockOnNameChange}
        onSubmit={mockOnSubmit}
      />,
    );
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });
  it("form submitted with empty fields does not call submit", async () => {
    const { user } = setup(
      <CreateUserForm
        isPendingCreatingUser={false}
        error={null}
        onNameChange={mockOnNameChange}
        onSubmit={mockOnSubmit}
      />,
    );
    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("rendering loading state when the creation process is pending and also disable the submit button", async () => {
    const { user } = setup(
      <CreateUserForm
        isPendingCreatingUser={true}
        error={null}
        onNameChange={mockOnNameChange}
        onSubmit={mockOnSubmit}
      />,
    );
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
    const submitButton = screen.getByTestId("submit-button");
    await user.click(submitButton);
    await user.click(submitButton);
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  it("call onNameChange when typing in the input", async () => {
    const { user } = setup(
      <CreateUserForm
        isPendingCreatingUser={true}
        error={null}
        onNameChange={mockOnNameChange}
        onSubmit={mockOnSubmit}
      />,
    );
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    await user.type(nameInput, "Mohammed Milly");

    expect(nameInput).toHaveValue("Mohammed Milly");
    expect(mockOnNameChange).toHaveBeenCalled();
  });
  it("Show an error alert in the form when an error prop provided", () => {
    render(
      <CreateUserForm
        isPendingCreatingUser={false}
        error={new Error("Network Error")}
        onNameChange={mockOnNameChange}
        onSubmit={mockOnSubmit}
      />,
    );
    const alertElement = screen.getByRole("alert");
    expect(alertElement.textContent).toMatch(/Network Error/i);
  });
});
