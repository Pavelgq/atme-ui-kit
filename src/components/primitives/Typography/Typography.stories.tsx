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

const articleFishText = {
  title: 'О типографике и читабельности текста',
  lead:
    'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана.',
  paragraphs: [
    'Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот.',
    'Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики.',
    'Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой, но текст не дал сбить себя с толку. Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу.',
  ],
  subheading: 'Секция о межбуквенном интервале',
};

const articleLayoutStyles: React.CSSProperties = {
  maxWidth: '65ch',
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
};

export const Article: Story = {
  render: () => (
    <article style={articleLayoutStyles}>
      <Typography variant="h1" as="h1">
        {articleFishText.title}
      </Typography>
      <Typography variant="body" size="lg" color="secondary" as="p">
        {articleFishText.lead}
      </Typography>
      {articleFishText.paragraphs.map((paragraph, i) => (
        <Typography key={i} variant="body" as="p">
          {paragraph}
        </Typography>
      ))}
      <Typography variant="h3" as="h2">
        {articleFishText.subheading}
      </Typography>
      <Typography variant="body" as="p">
        Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад на силуэт своей родной деревни Буквоград, на заголовок своего переулка Строчка и на подзаголовок своего дома, который переписывался. Он спросил себя: «Разве можно повернуть назад?» И продолжил свой путь.
      </Typography>
      <Typography variant="caption" as="p">
        Опубликовано в рубрике «Дизайн» · 5 минут чтения
      </Typography>
    </article>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Пример типографики в контексте статьи: заголовок, лид, абзацы, подзаголовок и подпись.',
      },
    },
  },
};

/** Маппинг MDX → Typography для components={} в MDXProvider */
export const MDXTypographyMapping: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <section>
        <Typography variant="overline" as="h3">
          MDX → Typography: покрыто
        </Typography>
        <Typography variant="body" as="p" size="sm">
          h1–h6, p, li, td/th — все есть в Typography
        </Typography>
      </section>
      <section>
        <Typography variant="overline" as="h3">
          Отдельные компоненты
        </Typography>
        <Typography variant="body" as="p" size="sm">
          blockquote → Quote, код → CodeBlock (Shiki), a → Link
        </Typography>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Сопоставление MDX с Typography. Quote для blockquote, CodeBlock для pre, Link для a.',
      },
    },
  },
};

