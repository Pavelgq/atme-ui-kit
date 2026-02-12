import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Primitives/Link",
  component: Link,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    showIcon: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "https://example.com",
    children: "Перейти на пример",
  },
};

export const WithoutIcon: Story = {
  args: {
    href: "https://example.com",
    children: "Ссылка без иконки",
    showIcon: false,
  },
};

export const External: Story = {
  args: {
    href: "https://github.com",
    target: "_blank",
    rel: "noopener noreferrer",
    children: "Внешняя ссылка (GitHub)",
  },
};

export const InlineText: Story = {
  render: () => (
    <p>
      Текст с{" "}
      <Link href="#">встроенной ссылкой</Link>{" "}
      в предложении.
    </p>
  ),
};

export const Playground: Story = {
  args: {
    href: "https://example.com",
    children: "Playground ссылка",
    showIcon: true,
  },
};
