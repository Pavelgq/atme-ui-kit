import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { HeartIcon, HomeIcon } from '../Icon/Icons';

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
      <Tag variant="neutral">Neutral</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag icon={<HeartIcon />} iconPosition="left">
        С иконкой слева
      </Tag>
      <Tag icon={<HomeIcon />} iconPosition="right">
        С иконкой справа
      </Tag>
    </div>
  ),
};

export const Closeable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag closeable>Closeable tag</Tag>
      <Tag closeable variant="success">
        Closeable success
      </Tag>
      <Tag closeable variant="error">
        Closeable error
      </Tag>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Tag href="#" variant="primary">
        Тег-ссылка
      </Tag>
      <Tag href="/" variant="success">
        Hover для scale
      </Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'При href тег рендерится как ссылка. Без подчёркивания, с лёгким увеличением при наведении.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Playground tag',
    closeable: false,
  },
};

