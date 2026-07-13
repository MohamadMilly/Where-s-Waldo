import { expect, it, describe, vi, beforeEach } from "vitest";
import { Timer } from "./Timer";
import { render, screen } from "@testing-library/react";
import { afterEach } from "node:test";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Timer component tests", () => {
  it("When isGameRunning prop is false, timer should never increase the count.", () => {
    const mockSetDuration = vi.fn();

    render(
      <Timer
        isGameRunning={false}
        setDuration={mockSetDuration}
        duration={0}
      />,
    );

    vi.advanceTimersByTime(3000);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(mockSetDuration).toHaveBeenCalledTimes(0);
  });

  it("when isGameRunning is true, the timer should increase by 1 every second.", () => {
    let duration = 0;
    const mockSetDuration = vi.fn(() => duration++);
    const { rerender } = render(
      <Timer
        isGameRunning={true}
        setDuration={mockSetDuration}
        duration={duration}
      />,
    );

    vi.advanceTimersByTime(3000);
    rerender(
      <Timer
        isGameRunning={true}
        setDuration={mockSetDuration}
        duration={duration}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(mockSetDuration).toHaveBeenCalledTimes(3);
  });
});

/* Other solution : promisify setTimeout */
/* 

const sleep = (ms) => new Promise(resolve => setTimeOut(resolve,ms))

so now the test function go to the macro task queue and waits for the promise to resolve

*/
