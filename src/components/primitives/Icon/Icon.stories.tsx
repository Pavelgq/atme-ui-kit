import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import * as Icons from './Icons';
import { CloseIcon } from './Icons';

const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Универсальный компонент для отображения SVG иконок. Поддерживает различные размеры и цвета. Новые иконки автоматически появляются в Storybook при добавлении в папку Icons/ и экспорте в Icons/index.ts',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
      description: 'Цвет иконки (по умолчанию использует currentColor)',
    },
    name: {
      control: 'text',
      description: 'Название иконки для accessibility',
    },
    decorative: {
      control: 'boolean',
      description: 'Декоративная иконка (скрыта от screen readers)',
    },
    children: {
      control: false,
      description: 'Содержимое SVG (path, circle, rect и т.д.)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const iconComponents = Object.entries(Icons).filter(
  ([name, component]) => typeof component === 'function' && name.endsWith('Icon')
) as Array<[string, React.FC<any>]>;

export const Default: Story = {
  render: (args) => <CloseIcon {...args} />,
  args: {
    name: 'Закрыть',
    width: '24px',
    height: '24px',
  },
};

export const WithChildren: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="Star icon">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
      </Icon>
      <Icon name="Heart icon">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
      </Icon>
      <Icon name="Circle icon">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
    </div>
  ),
};

export const WithCustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="Star icon" color="#f59e0b">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
      </Icon>
      <Icon name="Heart icon" color="#ef4444">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
      </Icon>
      <Icon name="Circle icon" color="#0ea5e9">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
    </div>
  ),
};

export const WithSvg: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon
        svg='<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f59e0b"/></svg>'
        name="Custom star icon"
      />
      <Icon
        svg='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#0ea5e9"/><circle cx="12" cy="12" r="6" fill="#ffffff"/></svg>'
        name="Custom circle icon"
      />
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Icon name="Information icon" decorative={false}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </Icon>
        <span>Icon with name (accessible)</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Icon decorative={true}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        </Icon>
        <span>Icon decorative (hidden from screen readers)</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1rem' }}>
      <Icon name="Small icon" style={{ fontSize: '0.75rem' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
      <Icon name="Medium icon" style={{ fontSize: '1rem' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
      <Icon name="Large icon" style={{ fontSize: '1.5rem' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
      <Icon name="XLarge icon" style={{ fontSize: '2rem' }}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      </Icon>
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => {
    if (iconComponents.length === 0) {
      return (
        <div>
          Нет доступных иконок. Добавьте иконки в папку Icons/ и экспортируйте их в Icons/index.ts
        </div>
      );
    }

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '2rem',
          padding: '2rem',
        }}
      >
        {iconComponents.map(([name, IconComponent]) => {
          const displayName = name.replace('Icon', '');
          return (
            <div
              key={name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center',
                padding: '1.5rem',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                }}
              >
                <IconComponent width="80px" height="80px" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{displayName}</div>
                <div style={{ fontSize: '12px', color: '#737373', fontFamily: 'monospace' }}>
                  {name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Playground: Story = {
  render: (args) => <CloseIcon {...args} />,
  args: {
    name: 'Закрыть',
    decorative: false,
    width: '24px',
    height: '24px',
  },
};

