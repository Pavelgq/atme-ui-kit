import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Primitives/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Брендовый логотип «Dev.lab». Wordmark с пиксельной точкой-акцентом, опциональной пиктограммой-меткой и отдельным «клавиатурным» вариантом, где буквы оформлены клавишами с анимацией нажатия. Многослойный glow на точке смешивает primary, warning и secondary — характерный warm-cold контраст палитры.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['wordmark', 'mark', 'lockup', 'keyboard'],
      description:
        'wordmark — только текст, mark — только пиктограмма, lockup — связка, keyboard — клавиатурный с анимацией нажатия',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    tone: {
      control: 'select',
      options: ['primary', 'mono', 'inverse'],
    },
    animated: {
      control: 'boolean',
    },
    sound: {
      control: 'boolean',
      description: 'Звук клика клавиш при наведении (только для variant="keyboard")',
    },
    soundVolume: {
      control: { type: 'range', min: 0, max: 1, step: 0.05 },
    },
    href: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    variant: 'wordmark',
    size: 'lg',
    tone: 'primary',
    animated: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '1.75rem 2rem',
        alignItems: 'center',
      }}
    >
      <code style={{ fontSize: 12, opacity: 0.6 }}>wordmark</code>
      <Logo variant="wordmark" size="lg" />

      <code style={{ fontSize: 12, opacity: 0.6 }}>mark</code>
      <Logo variant="mark" size="lg" />

      <code style={{ fontSize: 12, opacity: 0.6 }}>lockup</code>
      <Logo variant="lockup" size="lg" />

      <code style={{ fontSize: 12, opacity: 0.6 }}>keyboard</code>
      <Logo variant="keyboard" size="lg" />
    </div>
  ),
};

export const Keyboard: Story = {
  args: {
    variant: 'keyboard',
    size: 'lg',
    sound: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Initial-«печать» — три цикла нажатий в порядке «вразнобой», после чего клавиши застывают в исходном виде с чёрным текстом. Дальше каждая клавиша нажимается индивидуально при наведении курсора (с возможностью включить звук клика через prop `sound`).',
      },
    },
  },
};

export const KeyboardSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
      <Logo variant="keyboard" size="sm" />
      <Logo variant="keyboard" size="md" />
      <Logo variant="keyboard" size="lg" />
      <Logo variant="keyboard" size="xl" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <Logo variant="lockup" size="sm" />
      <Logo variant="lockup" size="md" />
      <Logo variant="lockup" size="lg" />
      <Logo variant="lockup" size="xl" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'var(--palette-background-default)',
          borderRadius: 8,
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Logo variant="lockup" size="lg" tone="primary" />
        <Logo variant="keyboard" size="md" tone="primary" />
      </div>
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'var(--palette-background-accent)',
          borderRadius: 8,
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Logo variant="lockup" size="lg" tone="mono" />
        <Logo variant="keyboard" size="md" tone="mono" />
      </div>
      <div
        style={{
          padding: '1.5rem 2rem',
          background: 'var(--palette-primary-main)',
          borderRadius: 8,
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <Logo variant="lockup" size="lg" tone="inverse" />
      </div>
    </div>
  ),
};

export const AsLink: Story = {
  args: {
    variant: 'lockup',
    size: 'lg',
    href: '#',
  },
  parameters: {
    docs: {
      description: {
        story:
          'При наведении на ссылочный логотип появляется лёгкий glitch-сдвиг текста и пульсирующая точка увеличивается. На keyboard-варианте hover ускоряет цикл «печати».',
      },
    },
  },
};

export const StaticNoAnimation: Story = {
  args: {
    variant: 'lockup',
    size: 'lg',
    animated: false,
  },
};

export const InHeader: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--palette-border-default)',
        background: 'var(--palette-background-paper)',
      }}
    >
      <Logo variant="lockup" size="md" href="#" />
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: 14, opacity: 0.75 }}>
        <a href="#" style={{ color: 'var(--palette-text-primary)', textDecoration: 'none' }}>
          Components
        </a>
        <a href="#" style={{ color: 'var(--palette-text-primary)', textDecoration: 'none' }}>
          Tokens
        </a>
        <a href="#" style={{ color: 'var(--palette-text-primary)', textDecoration: 'none' }}>
          Blog
        </a>
      </nav>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'keyboard',
    size: 'lg',
    tone: 'primary',
    animated: true,
    title: 'Dev.lab',
  },
};
