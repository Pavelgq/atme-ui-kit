import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stack } from "./Stack";

describe("Stack", () => {
  it("renders correctly", () => {
    render(
      <Stack data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Stack className="custom-class" data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveClass("custom-class");
  });

  it("applies testId attribute", () => {
    render(
      <Stack testId="test-stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("test-stack");
    expect(stack).toBeInTheDocument();
  });

  it("renders with custom tag", () => {
    render(
      <Stack as="section" data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack.tagName).toBe("SECTION");
  });

  it("applies direction classes", () => {
    const { rerender } = render(
      <Stack direction="column" data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    let stack = screen.getByTestId("stack");
    expect(stack.getAttribute("class")).toMatch(/stack--direction-column/);

    rerender(
      <Stack direction="row" data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    stack = screen.getByTestId("stack");
    expect(stack.getAttribute("class")).toMatch(/stack--direction-row/);
  });

  it("applies gap style with spacing multiplier", () => {
    render(
      <Stack gap={4} data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveStyle({ gap: "16px" });
  });

  it("applies gap style with custom string value", () => {
    render(
      <Stack gap="2rem" data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveStyle({ gap: "2rem" });
  });

  it("applies gap style with zero", () => {
    render(
      <Stack gap={0} data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveStyle({ gap: "0px" });
  });

  it("applies gap style with fractional multiplier", () => {
    render(
      <Stack gap={0.5} data-testid="stack">
        <div>Item</div>
      </Stack>
    );

    const stack = screen.getByTestId("stack");
    expect(stack).toHaveStyle({ gap: "2px" });
  });
});
