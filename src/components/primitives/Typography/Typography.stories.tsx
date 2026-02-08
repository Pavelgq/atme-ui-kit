import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Primitives/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    as: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Typography text',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body">Body text</Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography size="xs">Extra Small (xs)</Typography>
      <Typography size="sm">Small (sm)</Typography>
      <Typography size="base">Base (base)</Typography>
      <Typography size="lg">Large (lg)</Typography>
      <Typography size="xl">Extra Large (xl)</Typography>
      <Typography size="2xl">2XL (2xl)</Typography>
      <Typography size="3xl">3XL (3xl)</Typography>
      <Typography size="4xl">4XL (4xl)</Typography>
    </div>
  ),
};

export const WithCustomElement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography as="div" variant="h1">
        H1 as div
      </Typography>
      <Typography as="span" variant="body">
        Body as span
      </Typography>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'body',
    size: 'base',
    children: 'Playground text - edit props to see changes',
  },
};

