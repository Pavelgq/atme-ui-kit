import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LikeButton } from './LikeButton';

const meta: Meta<typeof LikeButton> = {
  title: 'Primitives/LikeButton',
  component: LikeButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Кнопка лайка: сердечко с анимацией «поп» при клике и лёгким биением при ховере в состоянии «лайк». Опционально показывается счётчик.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    liked: {
      control: 'boolean',
      description: 'Состояние «лайк поставлен»',
    },
    count: {
      control: 'number',
      description: 'Количество лайков',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {},
};

export const WithCount: Story = {
  args: {
    count: 42,
  },
};

export const Liked: Story = {
  args: {
    liked: true,
    count: 1,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(7);
    return (
      <LikeButton
        liked={liked}
        count={count}
        onLike={(next) => {
          setLiked(next);
          setCount((c) => (next ? c + 1 : c - 1));
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    liked: false,
    count: 0,
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    liked: false,
    count: 12,
    disabled: false,
  },
};
