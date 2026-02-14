import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid } from "./Grid";

describe("Grid", () => {
  it("renders correctly", () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Grid className="custom-class" data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveClass("custom-class");
  });

  it("applies testId attribute", () => {
    render(
      <Grid testId="test-grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("test-grid");
    expect(grid).toBeInTheDocument();
  });

  it("renders with custom tag", () => {
    render(
      <Grid as="section" data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid.tagName).toBe("SECTION");
  });

  it("applies gap style with spacing multiplier", () => {
    render(
      <Grid gap={4} data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveStyle({ gap: "16px" });
  });

  it("applies gap style with custom string value", () => {
    render(
      <Grid gap="2rem" data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveStyle({ gap: "2rem" });
  });

  it("applies fixed columns", () => {
    render(
      <Grid columns={3} data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveStyle({ gridTemplateColumns: "repeat(3, 1fr)" });
  });

  it("applies minColumnWidth for auto-fit", () => {
    render(
      <Grid minColumnWidth="200px" data-testid="grid">
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveStyle({
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    });
  });

  it("applies responsive columns with CSS variables", () => {
    render(
      <Grid
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
        }}
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    );

    const grid = screen.getByTestId("grid");
    expect(grid).toHaveStyle({
      "--grid-cols-xs": "1",
      "--grid-cols-sm": "2",
      "--grid-cols-md": "3",
    });
  });
});
