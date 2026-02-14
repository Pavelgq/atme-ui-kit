import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePreview } from './ArticlePreview';
import { Stack } from '../../layout/Stack';
import { TagGroup } from '../../primitives/TagGroup';

const meta: Meta<typeof ArticlePreview> = {
  title: 'Content/ArticlePreview',
  component: ArticlePreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Карточка превью статьи: card — контент слева, картинка справа (опц.); row — как файл в ОС (иконка, заголовок, теги, дата, просмотры). Без transform при hover.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: ['card', 'row'],
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
      description: 'URL превью (card: опц.; row: не используется)',
    },
    href: {
      control: 'text',
      description: 'URL карточки (вся карточка — ссылка)',
    },
    tags: {
      description: 'Слот для тегов (card: в футере; row: над заголовком)',
    },
    description: {
      control: 'text',
      description: 'Краткое описание статьи',
    },
    viewsCount: {
      control: 'number',
      description: 'Количество просмотров',
    },
    readingTimeMinutes: {
      control: 'number',
      description: 'Время чтения в минутах (card view)',
    },
    author: {
      description: 'Автор (avatarUrl, name). Для card view — опционально.',
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
  },
  parameters: {
    docs: {
      description: {
        story: 'Без imageUrl контент занимает всю ширину карточки.',
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

export const ViewRow: Story = {
  render: () => (
    <Stack direction="column" gap={2} style={{ maxWidth: 480 }}>
      <ArticlePreview
        title="Статья как файл в папке"
        publishedAt={defaultDate}
        view="row"
        viewsCount={567}
        tags={exampleTags}
        href="/blog/post-1"
      />
      <ArticlePreview
        title="Ещё один документ"
        publishedAt="2024-12-01"
        view="row"
        viewsCount={12000}
      />
      <ArticlePreview title="Минимальный вариант" publishedAt="2025-01-01" view="row" />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Вариант «row» — как файл в ОС. Иконка документа, заголовок, теги, дата и просмотры.',
      },
    },
  },
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

const exampleTags = (
  <TagGroup
    tags={[
      { label: 'блог', href: '/tag/blog' },
      { label: 'дизайн', href: '/tag/design' },
      { label: 'UI', href: '/tag/ui' },
    ]}
    size="sm"
    variant="secondary"
    maxVisible={3}
  />
);

export const WithTagsRow: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    view: 'row',
    href: '/blog/post-1',
    tags: exampleTags,
    viewsCount: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'TagGroup над заголовком в варианте «в строку».',
      },
    },
  },
};

export const WithDescriptionAndViews: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    description: 'Краткое описание статьи, которое помогает пользователю понять содержание до перехода.',
    viewsCount: 1234,
    imageUrl: 'https://picsum.photos/400/250',
    href: '/blog/post-1',
  },
  parameters: {
    docs: {
      description: {
        story: 'С описанием и счётчиком просмотров.',
      },
    },
  },
};

export const ViewCard: Story = {
  render: () => (
    <Stack direction="column" gap={3} style={{ maxWidth: 680 }}>
      <ArticlePreview
        title="Designing a responsive landing page design in Figma"
        publishedAt="2025-02-12"
        description="Sakhi is a conceptual e-library platform for people who love to read, discuss and share their favourite books with others."
        view="card"
        imageUrl="https://picsum.photos/300/300"
        author={{ name: 'Piyush Kumar', avatarUrl: 'https://i.pravatar.cc/64?img=12' }}
        readingTimeMinutes={8}
        viewsCount={1234}
        tags={exampleTags}
        href="/blog/post-1"
      />
      <ArticlePreview
        title="Карточка без автора и без картинки"
        publishedAt="2025-02-10"
        description="Когда нет изображения и автора, контент занимает всю ширину карточки."
        view="card"
        readingTimeMinutes={5}
        viewsCount={567}
        tags={exampleTags}
      />
      <ArticlePreview
        title="Карточка с автором и без картинки"
        publishedAt="2025-02-08"
        description="Автор с плейсхолдером аватара (первая буква имени)."
        view="card"
        author={{ name: 'Иван Петров' }}
        readingTimeMinutes={12}
        viewsCount={89}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Вариант «card» — контент слева, картинка справа. Без imageUrl текст на всю ширину. author опционален.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    title: shortTitle,
    publishedAt: defaultDate,
    description: 'Краткое описание статьи',
    viewsCount: 999,
    imageUrl: 'https://picsum.photos/400/250',
    view: 'card',
    imageAlt: 'Превью',
    href: '/blog/post-1',
    onClick: () => {},
    readingTimeMinutes: 7,
    author: { name: 'Автор Статьи', avatarUrl: 'https://i.pravatar.cc/64?img=33' },
  },
};
