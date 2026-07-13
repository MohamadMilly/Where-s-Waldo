import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";
/* 
function setup(jsx: JSX.Element) {
  return {
    ...render(jsx),
    user: userEvent.setup(),
  };
}
  */

describe("Button Component Tests", () => {
  it("Button renders correctly", () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    expect(screen.getByRole("button").textContent).toBe("Click me");
  });
  it("The onClick function is called when clicking", async () => {
    const mockFunction = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={mockFunction}>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);
    expect(mockFunction).toHaveBeenCalled();
  });
  it("The onClick function is not called when not clicking", async () => {
    const mockFunction = vi.fn();
    render(<Button onClick={mockFunction}>Click me</Button>);
    expect(mockFunction).not.toHaveBeenCalled();
  });
});
