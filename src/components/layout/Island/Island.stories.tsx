import type { Meta, StoryObj } from "@storybook/react";
import { Island } from "./Island";
import { Typography } from "../../primitives/Typography";
import { Button } from "../../primitives/Button";
import { Stack } from "../Stack";

const meta: Meta<typeof Island> = {
  title: "Layout/Island",
  component: Island,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Компонент Island используется для создания изолированных контейнеров с визуальным выделением. Поддерживает различные размеры паддингов, варианты фона, уровни elevation и опциональную границу.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Размер внутренних отступов",
    },
    variant: {
      control: "select",
      options: ["default", "paper", "accent"],
      description: "Вариант фона",
    },
    elevation: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Уровень тени (elevation)",
    },
    bordered: {
      control: "boolean",
      description: "Показать границу",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Island>;

export const Default: Story = {
  args: {
    children: (
      <Typography variant="body">
        Это стандартный Island с паддингами и фоном. Используется для
        группировки связанного контента.
      </Typography>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column" gap={4}>
      <Island size="sm">
        <Typography variant="body">
          Small размер - компактные отступы
        </Typography>
      </Island>
      <Island size="md">
        <Typography variant="body">
          Medium размер - стандартные отступы (по умолчанию)
        </Typography>
      </Island>
      <Island size="lg">
        <Typography variant="body">
          Large размер - увеличенные отступы для большего пространства
        </Typography>
      </Island>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="column" gap={4}>
      <Island variant="default">
        <Typography variant="body">
          Вариант default - фон по умолчанию
        </Typography>
      </Island>
      <Island variant="paper">
        <Typography variant="body">
          Вариант paper - белый/светлый фон (по умолчанию)
        </Typography>
      </Island>
      <Island variant="accent">
        <Typography variant="body">Вариант accent - акцентный фон</Typography>
      </Island>
    </Stack>
  ),
};

export const Elevations: Story = {
  render: () => (
    <Stack direction="column" gap={6}>
      <Island elevation="none">
        <Typography variant="body">Без тени (elevation: none)</Typography>
      </Island>
      <Island elevation="sm">
        <Typography variant="body">Маленькая тень (elevation: sm)</Typography>
      </Island>
      <Island elevation="md">
        <Typography variant="body">Средняя тень (elevation: md)</Typography>
      </Island>
      <Island elevation="lg">
        <Typography variant="body">Большая тень (elevation: lg)</Typography>
      </Island>
      <Island elevation="xl">
        <Typography variant="body">
          Очень большая тень (elevation: xl)
        </Typography>
      </Island>
    </Stack>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Stack direction="column" gap={4}>
      <Island bordered>
        <Typography variant="body">Island с границей</Typography>
      </Island>
      <Island bordered elevation="md">
        <Typography variant="body">Island с границей и тенью</Typography>
      </Island>
    </Stack>
  ),
};

export const CardExample: Story = {
  render: () => (
    <Island size="lg" variant="paper" elevation="md" bordered>
      <Stack direction="column" gap={4}>
        <Typography variant="h3">Заголовок карточки</Typography>
        <Typography variant="body">
          Это пример использования Island в качестве карточки. Компонент
          обеспечивает визуальное выделение и группировку контента.
        </Typography>
        <Stack direction="row" gap={2} justify="end">
          <Button variant="outline">Отмена</Button>
          <Button variant="primary">Сохранить</Button>
        </Stack>
      </Stack>
    </Island>
  ),
};

export const MultipleIslands: Story = {
  render: () => (
    <Stack direction="column" gap={4}>
      <Island size="md" variant="paper" elevation="sm">
        <Stack direction="column" gap={2}>
          <Typography variant="h4">Первая секция</Typography>
          <Typography variant="body">Контент первой секции</Typography>
        </Stack>
      </Island>
      <Island size="md" variant="paper" elevation="sm">
        <Stack direction="column" gap={2}>
          <Typography variant="h4">Вторая секция</Typography>
          <Typography variant="body">Контент второй секции</Typography>
        </Stack>
      </Island>
      <Island size="md" variant="accent" elevation="sm">
        <Stack direction="column" gap={2}>
          <Typography variant="h4">Акцентная секция</Typography>
          <Typography variant="body">
            Выделенная секция с акцентным фоном
          </Typography>
        </Stack>
      </Island>
    </Stack>
  ),
};

export const Playground: Story = {
  args: {
    size: "md",
    variant: "paper",
    elevation: "none",
    bordered: false,
    children: (
      <Typography variant="body">
        Используйте контролы для настройки всех параметров Island компонента.
      </Typography>
    ),
  },
};
