import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Primitives/Callout",
  component: Callout,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "radio",
      options: ["info", "warning", "success"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    tone: "info",
    children:
      "Используйте короткие абзацы и подзаголовки — так текст совета будет легче читать и сканировать взглядом.",
  },
};

export const Warning: Story = {
  args: {
    tone: "warning",
    children:
      "Перед изменением конфигурации сделайте резервную копию — это поможет быстро откатиться, если что-то пойдет не так.",
  },
};

export const Success: Story = {
  args: {
    tone: "success",
    children:
      "Отлично! Вы настроили компонент — теперь его можно использовать в статьях и документации.",
  },
};

