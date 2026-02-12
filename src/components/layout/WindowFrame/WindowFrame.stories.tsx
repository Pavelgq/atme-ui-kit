import type { Meta, StoryObj } from "@storybook/react";
import { WindowFrame } from "./WindowFrame";

const meta: Meta<typeof WindowFrame> = {
  title: "Layout/WindowFrame",
  component: WindowFrame,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WindowFrame>;

export const Default: Story = {
  args: {
    title: "Загрузка...",
    children: <div style={{ height: "100px" }}></div>,
  },
};
