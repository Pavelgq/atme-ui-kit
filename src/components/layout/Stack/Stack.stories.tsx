import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { Button } from "../../primitives/Button";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: 4,
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const WithGap: Story = {
  args: {
    gap: 6,
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    justify: "center",
    align: "center",
    gap: 4,
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    justify: "between",
    gap: 4,
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const Wrapped: Story = {
  args: {
    wrap: "wrap",
    gap: 4,
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Button key={i}>Button {i + 1}</Button>
        ))}
      </>
    ),
  },
};

export const CustomTag: Story = {
  args: {
    as: "section",
    gap: 4,
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};

export const CustomGap: Story = {
  args: {
    gap: "2rem",
    children: (
      <>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </>
    ),
  },
};
