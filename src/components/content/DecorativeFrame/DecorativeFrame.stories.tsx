import type { Meta, StoryObj } from '@storybook/react';
import { DecorativeFrame } from './DecorativeFrame';

const meta: Meta<typeof DecorativeFrame> = {
  title: 'Content/DecorativeFrame',
  component: DecorativeFrame,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Обёртка с декоративным паттерном по краю контейнера. Генерирует сетку геометрических фигур (круги, треугольники, полоски) для украшения превью статей или других блоков. Поддерживает анимацию появления «конструктор».',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    edge: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Сторона контейнера для декоративной полосы',
    },
    direction: {
      control: 'radio',
      options: ['external', 'internal'],
      description:
        'Направление пробелов: external — наружу (полоса снаружи), internal — внутрь (полоса примыкает к контенту)',
    },
    boxSize: {
      control: { type: 'number', min: 12, max: 48 },
      description: 'Размер ячейки паттерна в px',
    },
    stripDensity: {
      control: { type: 'number', min: 1, max: 8 },
      description: 'Кол-во ячеек по толщине полосы (1–8). Каждая ячейка 24×24, полоса расширяется',
    },
    seed: {
      control: { type: 'number' },
      description: 'Seed для детерминированной генерации',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DecorativeFrame>;

export const Default: Story = {
  args: {
    edge: 'right',
    children: (
      <div
        style={{
          padding: 24,
          minHeight: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--palette-text-secondary)',
        }}
      >
        Контент с декорацией по правому краю
      </div>
    ),
  },
};

export const EdgeTop: Story = {
  args: {
    edge: 'top',
    children: (
      <div style={{ padding: 24, minHeight: 120 }}>
        Полоса сверху
      </div>
    ),
  },
};

export const EdgeBottom: Story = {
  args: {
    edge: 'bottom',
    children: (
      <div style={{ padding: 24, minHeight: 120 }}>
        Полоса снизу
      </div>
    ),
  },
};

export const EdgeLeft: Story = {
  args: {
    edge: 'left',
    children: (
      <div style={{ padding: 24, minHeight: 120 }}>
        Полоса слева
      </div>
    ),
  },
};

const customColors = [
  '#C8B5AD',
  '#D8D3C2',
  '#F0ECDB',
  '#82978D',
  '#617178',
  '#575D6A',
];

export const CustomColors: Story = {
  args: {
    edge: 'right',
    colors: customColors,
    children: (
      <div
        style={{
          padding: 24,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Кастомная палитра
      </div>
    ),
  },
};

export const ArticlePreviewPlaceholder: Story = {
  render: () => (
    <DecorativeFrame edge="right" boxSize={24} seed={123}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 24,
          minHeight: 180,
          backgroundColor: 'var(--palette-background-paper)',
          border: '1px solid var(--palette-border-subtle)',
          borderRadius: 'var(--border-radius-lg) 0 0 var(--border-radius-lg)',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 'var(--typography-font-size-sm)',
            color: 'var(--palette-text-secondary)',
          }}
        >
          5 февраля 2025
        </div>
        <div
          style={{
            fontSize: 'var(--typography-font-size-lg)',
            fontWeight: 'var(--typography-font-weight-semibold)',
            color: 'var(--palette-text-primary)',
          }}
        >
          Designing a responsive landing page
        </div>
        <div
          style={{
            fontSize: 'var(--typography-font-size-sm)',
            color: 'var(--palette-text-secondary)',
            lineHeight: 1.5,
          }}
        >
          Sakhi is a conceptual e-library platform for people who love to read.
        </div>
      </div>
    </DecorativeFrame>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Симуляция превью статьи без изображения: контент слева, декоративный паттерн справа (direction=external).',
      },
    },
  },
};

export const DirectionInternal: Story = {
  args: {
    edge: 'right',
    direction: 'internal',
    boxSize: 24,
    seed: 123,
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: 24,
          minHeight: 180,
          backgroundColor: 'var(--palette-background-paper)',
          border: '1px solid var(--palette-border-subtle)',
          borderRadius: 'var(--border-radius-lg) 0 0 var(--border-radius-lg)',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 'var(--typography-font-size-sm)',
            color: 'var(--palette-text-secondary)',
          }}
        >
          5 февраля 2025
        </div>
        <div
          style={{
            fontSize: 'var(--typography-font-size-lg)',
            fontWeight: 'var(--typography-font-weight-semibold)',
            color: 'var(--palette-text-primary)',
          }}
        >
          Internal: пробелы направлены внутрь
        </div>
        <div
          style={{
            fontSize: 'var(--typography-font-size-sm)',
            color: 'var(--palette-text-secondary)',
            lineHeight: 1.5,
          }}
        >
          Полоса справа, паттерн зеркально развёрнут.
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'direction=internal — полоса справа, паттерн зеркально развёрнут, пробелы направлены внутрь.',
      },
    },
  },
};

export const DeterministPattern: Story = {
  args: {
    edge: 'right',
    seed: 42,
    children: (
      <div style={{ padding: 24, minHeight: 180 }}>
        Одинаковый паттерн при каждом рендере (seed=42)
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'С указанным seed паттерн воспроизводится детерминированно.',
      },
    },
  },
};
