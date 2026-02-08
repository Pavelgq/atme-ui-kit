import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { HomeIcon } from "../Icon/Icons";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Введите текст...",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "320px" }}>
      <Input size="sm" placeholder="Маленький (sm)" />
      <Input size="md" placeholder="Средний (md)" />
      <Input size="lg" placeholder="Большой (lg)" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "320px" }}>
      <Input
        startIcon={<HomeIcon decorative width={20} height={20} />}
        placeholder="Иконка слева"
        aria-label="Поле с иконкой слева"
      />
      <Input
        endIcon={<span style={{ fontSize: "1rem" }}>🔍</span>}
        placeholder="Иконка справа"
        aria-label="Поле с иконкой справа"
      />
      <Input
        startIcon={<HomeIcon decorative width={18} height={18} />}
        endIcon={<span style={{ fontSize: "0.875rem" }}>→</span>}
        placeholder="Обе иконки"
        aria-label="Поле с иконками"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "320px" }}>
      <Input placeholder="Обычное состояние" aria-label="Обычное" />
      <Input placeholder="Disabled" disabled aria-label="Отключено" />
      <Input placeholder="Ошибка" error aria-label="С ошибкой" />
      <Input
        placeholder="С описанием ошибки"
        error
        errorMessageId="err-1"
        aria-label="С ошибкой и описанием"
      />
      <span id="err-1" style={{ fontSize: "0.875rem", color: "var(--palette-error-main)" }}>
        Обязательное поле
      </span>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <Input fullWidth placeholder="Full width поле" aria-label="На всю ширину" />
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "320px" }}>
      <Input
        placeholder="С подписью для screen readers"
        aria-label="Поиск по сайту"
        aria-required
      />
      <Input
        placeholder="Required с визуальной меткой"
        aria-label="Email"
        aria-required
        required
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    size: "md",
    placeholder: "Playground",
    disabled: false,
    error: false,
    fullWidth: false,
    "aria-label": "Playground input",
  },
};
