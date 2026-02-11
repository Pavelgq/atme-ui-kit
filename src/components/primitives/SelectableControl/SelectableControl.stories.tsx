import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectableControl } from "./SelectableControl";

const meta: Meta<typeof SelectableControl> = {
  title: "Primitives/SelectableControl",
  component: SelectableControl,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["checkbox", "radio"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectableControl>;

export const Checkbox: Story = {
  args: {
    type: "checkbox",
    size: "md",
    children: "Показывать детальную аналитику",
    description: "Опция влияет на блок с расширенной статистикой",
  },
};

export const RadioGroupExample: Story = {
  render: () => {
    const [value, setValue] = useState("frontend");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <SelectableControl
          type="radio"
          name="direction"
          checked={value === "frontend"}
          onChange={() => setValue("frontend")}
        >
          Frontend
        </SelectableControl>
        <SelectableControl
          type="radio"
          name="direction"
          checked={value === "backend"}
          onChange={() => setValue("backend")}
        >
          Backend
        </SelectableControl>
        <SelectableControl
          type="radio"
          name="direction"
          checked={value === "fullstack"}
          onChange={() => setValue("fullstack")}
        >
          Fullstack
        </SelectableControl>
      </div>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    type: "checkbox",
    indeterminate: true,
    children: "Выбрана часть подзадач",
    description: "Полезно для parent-checkbox в списках",
  },
};
