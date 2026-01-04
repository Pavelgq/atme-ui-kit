import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";
import { Button } from "../../primitives/Button";

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <Button key={i}>Item {i + 1}</Button>
        ))}
      </>
    ),
  },
};

export const TwelveColumns: Story = {
  args: {
    columns: 12,
    gap: 4,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              background: "var(--color-semantic-surface-secondary, #f0f0f0)",
              borderRadius: "4px",
            }}
          >
            Col {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

export const Responsive: Story = {
  args: {
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
    },
    gap: 4,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              background: "var(--color-semantic-surface-secondary, #f0f0f0)",
              borderRadius: "4px",
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

export const AutoFit: Story = {
  args: {
    minColumnWidth: "200px",
    gap: 4,
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              background: "var(--color-semantic-surface-secondary, #f0f0f0)",
              borderRadius: "4px",
            }}
          >
            Auto {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

export const CustomGap: Story = {
  args: {
    columns: 4,
    gap: "2rem",
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              background: "var(--color-semantic-surface-secondary, #f0f0f0)",
              borderRadius: "4px",
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};

export const CustomTag: Story = {
  args: {
    as: "section",
    columns: 3,
    gap: 4,
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              background: "var(--color-semantic-surface-secondary, #f0f0f0)",
              borderRadius: "4px",
            }}
          >
            Item {i + 1}
          </div>
        ))}
      </>
    ),
  },
};
