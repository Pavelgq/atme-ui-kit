import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Primitives/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: "select",
      options: ["primary", "secondary", "success", "warning"],
    },
    showValueLabel: {
      control: "boolean",
    },
    sequentialAnimation: {
      control: "boolean",
    },
    animationStepMs: {
      control: { type: "number", min: 20, max: 500, step: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 35,
    max: 100,
    segments: 10,
    size: "md",
    tone: "secondary",
    showValueLabel: true,
  },
};

export const QuizStyle: Story = {
  args: {
    value: 1,
    max: 15,
    segments: 15,
    size: "md",
    tone: "secondary",
    showValueLabel: true,
    valueLabel: "1 / 15",
  },
};

export const WithoutNumbers: Story = {
  args: {
    value: 9,
    max: 15,
    segments: 15,
    size: "md",
    tone: "secondary",
    showValueLabel: false,
  },
};

export const SequentialLoading: Story = {
  args: {
    value: 15,
    max: 15,
    segments: 15,
    size: "md",
    tone: "secondary",
    showValueLabel: true,
    valueLabel: "Загрузка...",
    sequentialAnimation: true,
    animationStepMs: 90,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: 720 }}>
      <ProgressBar value={5} max={15} segments={15} size="sm" showValueLabel />
      <ProgressBar value={7} max={15} segments={15} size="md" showValueLabel />
      <ProgressBar value={10} max={15} segments={15} size="lg" showValueLabel />
    </div>
  ),
};
