import type { Meta, StoryObj } from "@storybook/react";
import { Quote } from "./Quote";

const meta: Meta<typeof Quote> = {
  title: "Primitives/Quote",
  component: Quote,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    author: { control: "text" },
    cite: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Quote>;

export const Default: Story = {
  args: {
    children: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.",
  },
};

export const WithAuthor: Story = {
  args: {
    children: "Простота — высшая форма сложности.",
    author: "Леонардо да Винчи",
  },
};

export const WithCite: Story = {
  args: {
    children: "Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой.",
    author: "Рыбный текст",
    cite: "https://example.com",
  },
};
