import type { Meta, StoryObj } from "@storybook/react";
import { Term } from "./Term";
import { Typography } from "../Typography";

const meta: Meta<typeof Term> = {
  title: "Primitives/Term",
  component: Term,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    definition: { control: "text" },
    tooltipWidth: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Term>;

export const Default: Story = {
  args: {
    definition: "Термин — слово или словосочетание, обозначающее понятие в определённой области знания.",
    children: "термин",
  },
};

export const InText: Story = {
  render: (args) => (
    <Typography variant="body" as="p">
      В лингвистике <Term {...args} /> — это специальное слово или устойчивое словосочетание,
      используемое в научном, техническом или профессиональном контексте.
    </Typography>
  ),
  args: {
    definition: "Термин — слово или словосочетание, обозначающее понятие в определённой области знания.",
    children: "термин",
  },
};

export const CustomWidth: Story = {
  args: {
    definition:
      "Очень длинное пояснение, которое не должно растягивать тултип на всю ширину экрана. Максимальная ширина задана в 200 пикселей.",
    children: "узкий тултип",
    tooltipWidth: 200,
  },
};

export const CustomWidthRem: Story = {
  args: {
    definition: "Ширина тултипа может быть задана в rem, например 18rem.",
    children: "ширина 18rem",
    tooltipWidth: "18rem",
  },
};
