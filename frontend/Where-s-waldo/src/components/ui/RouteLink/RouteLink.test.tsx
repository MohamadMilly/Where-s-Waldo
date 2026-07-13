import { expect, it, describe } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouteLink } from "./RouteLink";
import { MemoryRouter } from "react-router";

describe("testing RouteLink", () => {
  it("route link renders correctly and with purple text if the routes in the URL and link don't match", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteLink route="/link">link</RouteLink>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link");
    expect(link.textContent).toMatch(/link/i);
    expect(link).toHaveClass("text-purple-400");
  });
  it("route link renders correctly and with white text if the routes in the URL and link match", () => {
    render(
      <MemoryRouter initialEntries={["/link"]}>
        <RouteLink route="/link">link</RouteLink>
      </MemoryRouter>,
    );
    const link = screen.getByRole("link");
    expect(link.textContent).toMatch(/link/i);
    expect(link).toHaveClass("text-white");
  });
});
