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

