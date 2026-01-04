import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagGroup } from "./TagGroup";
import { Tag } from "../Tag";

const meta: Meta<typeof TagGroup> = {
  title: "Primitives/TagGroup",
  component: TagGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    maxVisible: {
      control: "number",
      description: "Максимальное количество видимых тегов",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "neutral",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagGroup>;

const manyTags = [
  "React",
  "TypeScript",
  "JavaScript",
  "CSS",
  "HTML",
  "Node.js",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Remix",
  "Astro",
];

export const Default: Story = {
  args: {
    tags: manyTags,
    maxVisible: 5,
  },
};

export const WithCustomMaxVisible: Story = {
  args: {
    tags: manyTags,
    maxVisible: 3,
  },
};

export const AllVisible: Story = {
  args: {
    tags: ["React", "TypeScript", "JavaScript"],
    maxVisible: 5,
  },
};

export const WithCustomTags: Story = {
  render: () => (
    <TagGroup
      tags={[
        <Tag key="1" variant="primary">
          Primary
        </Tag>,
        <Tag key="2" variant="success">
          Success
        </Tag>,
        <Tag key="3" variant="warning">
          Warning
        </Tag>,
        <Tag key="4" variant="error">
          Error
        </Tag>,
        <Tag key="5" variant="neutral">
          Neutral
        </Tag>,
        <Tag key="6" variant="secondary">
          Secondary
        </Tag>,
        <Tag key="7" variant="primary">
          Another Primary
        </Tag>,
      ]}
      maxVisible={4}
    />
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TagGroup tags={manyTags} maxVisible={3} size="sm" />
      <TagGroup tags={manyTags} maxVisible={3} size="md" />
      <TagGroup tags={manyTags} maxVisible={3} size="lg" />
    </div>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <TagGroup tags={manyTags} maxVisible={3} variant="primary" />
      <TagGroup tags={manyTags} maxVisible={3} variant="secondary" />
      <TagGroup tags={manyTags} maxVisible={3} variant="neutral" />
    </div>
  ),
};

export const CustomCollapseText: Story = {
  args: {
    tags: manyTags,
    maxVisible: 5,
    collapseText: "Показать меньше",
  },
};

export const Playground: Story = {
  args: {
    tags: manyTags,
    maxVisible: 5,
    size: "md",
    variant: "primary",
    collapseText: "Свернуть",
  },
};
