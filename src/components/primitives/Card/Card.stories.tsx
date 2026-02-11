import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../Typography";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "paper", "accent"],
    },
    elevation: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    bordered: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "paper",
    elevation: "sm",
    bordered: true,
    children: "Карточка для контентных блоков теста",
  },
};

export const QuizSectionExample: Story = {
  render: () => (
    <Card variant="paper" elevation="sm" bordered>
      <Typography variant="h3" as="h3">
        Вопрос 1 из 15
      </Typography>
      <Typography style={{ marginTop: "0.75rem" }}>
        Какой подход к рефакторингу ты выбираешь, когда сроки очень сжатые?
      </Typography>
    </Card>
  ),
};
