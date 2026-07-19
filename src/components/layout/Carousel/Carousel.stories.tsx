import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { Card } from '../../primitives/Card';
import { Typography } from '../../primitives/Typography';
import { ArticlePreview } from '../../content/ArticlePreview';

const meta: Meta<typeof Carousel> = {
  title: 'Layout/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Универсальная карусель со стрелками и свайпом: принимает любые дочерние элементы как слайды. Поддерживает адаптивное число видимых слайдов, зацикливание, точки-пагинацию и управляемый/неуправляемый индекс.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    itemsPerView: {
      control: 'number',
      description: 'Число видимых слайдов (число или объект по брейкпоинтам)',
    },
    gap: {
      control: 'number',
      description: 'Отступ между слайдами (в единицах spacing)',
    },
    loop: {
      control: 'boolean',
      description: 'Зацикливать переход между первым и последним слайдом',
    },
    showArrows: {
      control: 'boolean',
    },
    showDots: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const placeholderSlides = Array.from({ length: 6 }, (_, i) => (
  <Card key={i} variant="paper" elevation="sm" bordered>
    <Typography variant="h4" as="h3">
      Слайд {i + 1}
    </Typography>
    <Typography variant="body" color="secondary">
      Любой контент внутри карусели — карточки, изображения, статьи.
    </Typography>
  </Card>
));

export const Default: Story = {
  args: {
    itemsPerView: 1,
    gap: 4,
    loop: false,
    showArrows: true,
    showDots: true,
    children: placeholderSlides,
  },
};

export const MultipleItems: Story = {
  args: {
    itemsPerView: { xs: 1, sm: 2, md: 3 },
    gap: 4,
    loop: false,
    showArrows: true,
    showDots: false,
    children: placeholderSlides,
  },
};

export const Loop: Story = {
  args: {
    itemsPerView: 1,
    gap: 4,
    loop: true,
    showArrows: true,
    showDots: true,
    children: placeholderSlides,
  },
};

const articles = [
  {
    title: 'Как мы переписали дизайн-систему на CSS-переменные',
    description: 'Разбираем миграцию токенов темы и что это дало команде.',
    publishedAt: '2026-05-12',
    readingTimeMinutes: 6,
    viewsCount: 1240,
    href: '#',
  },
  {
    title: 'Скролл-снап карусели без тяжёлых зависимостей',
    description: 'Почему нативный overflow-x и scroll-snap лучше, чем очередная библиотека.',
    publishedAt: '2026-04-02',
    readingTimeMinutes: 4,
    viewsCount: 860,
    href: '#',
  },
  {
    title: 'Доступность в интерактивных компонентах',
    description: 'aria-roledescription, живые регионы и клавиатурная навигация на практике.',
    publishedAt: '2026-03-18',
    readingTimeMinutes: 8,
    viewsCount: 2032,
    href: '#',
  },
  {
    title: 'RSS жив: зачем мы вернули подписку на статьи',
    description: 'Небольшая история о том, почему открытые протоколы снова в моде.',
    publishedAt: '2026-02-27',
    readingTimeMinutes: 3,
    viewsCount: 512,
    href: '#',
  },
];

export const ArticlesCarousel: Story = {
  name: 'Пример: карусель статей',
  args: {
    itemsPerView: { xs: 1, sm: 2, lg: 3 },
    gap: 4,
    showArrows: true,
    showDots: true,
    ariaLabel: 'Свежие статьи',
    children: articles.map((article) => <ArticlePreview key={article.title} {...article} />),
  },
};
