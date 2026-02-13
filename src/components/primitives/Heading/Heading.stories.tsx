import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Primitives/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Заголовок на базе Typography с обёрткой. Поддерживает якорные ссылки — при указании anchorId заголовок становится ссылкой, при наведении появляется иконка # с анимацией палочек.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Вариант типографики",
    },
    anchorId: {
      control: "text",
      description: "ID для якорной ссылки. При указании заголовок становится ссылкой с иконкой #",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: "Обычный заголовок",
    variant: "h2",
  },
};

export const WithAnchor: Story = {
  args: {
    children: "Заголовок с якорем",
    variant: "h2",
    anchorId: "section-title",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading variant="h1">Heading 1</Heading>
      <Heading variant="h2">Heading 2</Heading>
      <Heading variant="h3">Heading 3</Heading>
      <Heading variant="h4">Heading 4</Heading>
      <Heading variant="h5">Heading 5</Heading>
      <Heading variant="h6">Heading 6</Heading>
    </div>
  ),
};

export const WithAnchors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Heading variant="h1" anchorId="intro">
        Введение
      </Heading>
      <p>Наведите на заголовок выше — появится иконка # с анимацией палочек.</p>

      <Heading variant="h2" anchorId="features">
        Возможности
      </Heading>
      <p>Каждый заголовок с anchorId становится кликабельной ссылкой на якорь.</p>

      <Heading variant="h3" anchorId="conclusion">
        Заключение
      </Heading>
    </div>
  ),
};
