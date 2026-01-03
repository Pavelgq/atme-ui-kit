import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LabelMenuItem } from './LabelMenuItem';
import { CloseIcon, DocumentIcon } from '../Icon/Icons';

const meta: Meta<typeof LabelMenuItem> = {
  title: 'Primitives/LabelMenuItem',
  component: LabelMenuItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент пункта меню с иконкой и текстом. Используется для навигационных элементов с визуальной иконкой.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    iconSize: {
      control: 'text',
      description: 'Размер иконки (строка или число)',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LabelMenuItem>;

export const Default: Story = {
  args: {
    label: 'Меню',
    icon: DocumentIcon,
    onClick: () => {},
  },
};

export const WithCloseIcon: Story = {
  args: {
    label: 'Закрыть',
    icon: CloseIcon,
    onClick: () => {},
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <LabelMenuItem label="Активный" icon={DocumentIcon} onClick={() => {}} />
      <LabelMenuItem label="Неактивный" icon={DocumentIcon} onClick={() => {}} disabled />
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <LabelMenuItem label="Маленький" icon={DocumentIcon} iconSize="30px" onClick={() => {}} />
      <LabelMenuItem label="Средний" icon={DocumentIcon} iconSize="50px" onClick={() => {}} />
      <LabelMenuItem label="Большой" icon={DocumentIcon} iconSize="70px" onClick={() => {}} />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    label: 'Пункт меню',
    icon: DocumentIcon,
    onClick: () => {},
    disabled: false,
    iconSize: '50px',
  },
};

