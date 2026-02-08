import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    dot: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "5",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="primary">1</Badge>
      <Badge variant="secondary">2</Badge>
      <Badge variant="success">OK</Badge>
      <Badge variant="warning">!</Badge>
      <Badge variant="error">0</Badge>
      <Badge variant="neutral">N</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Badge size="sm">9</Badge>
      <Badge size="md">12</Badge>
      <Badge size="lg">99</Badge>
    </div>
  ),
};

export const Dot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
      <Badge dot variant="primary" size="sm" aria-label="Online" />
      <Badge dot variant="success" size="md" aria-label="Active" />
      <Badge dot variant="error" size="lg" aria-label="Error" />
    </div>
  ),
};

export const Max: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge max={99}>{42}</Badge>
      <Badge max={99}>{150}</Badge>
      <Badge max={9}>{3}</Badge>
      <Badge max={9}>{12}</Badge>
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge>NEW</Badge>
      <Badge variant="success">Done</Badge>
      <Badge variant="warning">Draft</Badge>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "5",
    dot: false,
    max: 99,
  },
};
