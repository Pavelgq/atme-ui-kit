import type { Meta, StoryObj } from '@storybook/react';
import sampleMd from './__fixtures__/sample.md?raw';
import { Markdown } from './Markdown';

const meta: Meta<typeof Markdown> = {
  title: 'Content/Markdown',
  component: Markdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Рендер строки Markdown в оформленный HTML. Блоки кода подсвечиваются через Shiki (темы github-light / github-dark, переключение по prefers-color-scheme и data-color-scheme="dark").',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: 'text',
      description: 'Строка в формате Markdown',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Markdown>;

export const Default: Story = {
  args: {
    source: sampleMd,
  },
};

export const Short: Story = {
  args: {
    source: '**Привет**, это *короткий* markdown с `кодом`.',
  },
};

export const CodeBlock: Story = {
  args: {
    source: `
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`
    `.trim(),
  },
};

export const Empty: Story = {
  args: {
    source: '',
  },
};
