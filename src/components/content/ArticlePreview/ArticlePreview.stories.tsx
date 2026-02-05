import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePreview } from './ArticlePreview';
import { Stack } from '../../layout/Stack';

const meta: Meta<typeof ArticlePreview> = {
  title: 'Content/ArticlePreview',
  component: ArticlePreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Карточка превью статьи блога: изображение (или мок без изображения для SSR), заголовок с обрезкой и подсказкой при наведении, дата публикации. Варианты: плитка (tile) или в строку (row). При наведении карточка выделяется, cursor: pointer при наличии onClick.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: ['tile', 'row'],
      description: 'Вариант отображения',
    },
    title: {
      control: 'text',
      description: 'Заголовок статьи',
    },
    publishedAt: {
      control: 'text',
      description: 'Дата публикации (ISO строка или Date)',
    },
    imageUrl: {
      control: 'text',
      description: 'URL превью (не задан — мок-плейсхолдер)',
    },
    href: {
      control: 'text',
      description: 'URL карточки (вся карточка — ссылка)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticlePreview>;

const defaultDate = '2025-02-05';
const shortTitle = 'Краткий заголовок статьи';
const longTitle =
  'Очень длинный заголовок статьи, который не помещается в одну или две строки и должен обрезаться многоточием, а при наведении показывать полный текст во всплывающей подсказке';

export const Default: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
  },
};

export const WithImage: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    imageUrl: 'https://picsum.photos/400/250',
    imageAlt: 'Превью статьи',
  },
};

export const MockNoImage: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    imageUrl: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Без imageUrl показывается плейсхолдер (удобно для SSR или когда изображения нет).',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    title: longTitle,
    publishedAt: defaultDate,
    imageUrl: 'https://picsum.photos/400/250',
  },
  parameters: {
    docs: {
      description: {
        story: 'Длинный заголовок обрезается многоточием. Наведите курсор — появится подсказка с полным текстом.',
      },
    },
  },
};

export const ViewTile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <ArticlePreview
        title="Плитка с картинкой"
        publishedAt={defaultDate}
        imageUrl="https://picsum.photos/400/250"
        view="tile"
        onClick={() => alert('Клик по карточке')}
      />
      <ArticlePreview
        title="Плитка без картинки"
        publishedAt={defaultDate}
        view="tile"
        onClick={() => alert('Клик')}
      />
    </div>
  ),
};

export const ViewRow: Story = {
  render: () => (
    <Stack direction="column" gap={3} style={{ maxWidth: 560 }}>
      <ArticlePreview
        title="Превью в строку с изображением"
        publishedAt={defaultDate}
        imageUrl="https://picsum.photos/200/200"
        view="row"
        onClick={() => {}}
      />
      <ArticlePreview
        title="Превью в строку без изображения (мок)"
        publishedAt="2024-12-01"
        view="row"
      />
    </Stack>
  ),
};

export const Interactive: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    imageUrl: 'https://picsum.photos/400/250',
    onClick: () => alert('Переход к статье'),
  },
  parameters: {
    docs: {
      description: {
        story: 'С onClick карточка получает cursor: pointer и выделение при наведении.',
      },
    },
  },
};

export const WithHref: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    imageUrl: 'https://picsum.photos/400/250',
    href: '/blog/post-1',
  },
  parameters: {
    docs: {
      description: {
        story: 'С переданным href вся карточка — кликабельная ссылка.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    imageUrl: 'https://picsum.photos/400/250',
    view: 'tile',
    imageAlt: 'Превью',
    href: '/blog/post-1',
    onClick: () => {},
  },
};
