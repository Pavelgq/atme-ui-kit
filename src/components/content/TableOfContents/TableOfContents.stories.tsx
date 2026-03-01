import type { Meta, StoryObj } from '@storybook/react';
import { TableOfContents } from './TableOfContents';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { Typography } from '../../primitives/Typography';

const meta: Meta<typeof TableOfContents> = {
  title: 'Content/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Содержание статьи: список глав с якорями. Подсветка активного пункта при скролле через хук `useActiveSection`. Логика скролла вынесена из UI — компонент принимает `activeId` снаружи.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Список пунктов: id, href (якорь), label, level (2–6, по умолчанию 2 — раздел, 3+ — подраздел с отступом)',
    },
    activeId: {
      description: 'id активной секции (из useActiveSection)',
    },
    title: {
      control: 'text',
      description: 'Заголовок блока',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableOfContents>;

const defaultItems = [
  { id: 'vvedenie', href: '#vvedenie', label: 'Введение' },
  { id: 'glava-1', href: '#glava-1', label: 'Глава 1. Основы' },
  { id: 'glava-2', href: '#glava-2', label: 'Глава 2. Продвинутые темы' },
  { id: 'zaklyuchenie', href: '#zaklyuchenie', label: 'Заключение' },
];

const itemsWithHierarchy = [
  { id: 'intro', href: '#intro', label: 'Введение', level: 2 as const },
  { id: 'ch1', href: '#ch1', label: 'Глава 1. Основы', level: 2 as const },
  { id: 'ch1-1', href: '#ch1-1', label: 'Что такое основы', level: 3 as const },
  { id: 'ch1-2', href: '#ch1-2', label: 'Синтаксис', level: 3 as const },
  { id: 'ch2', href: '#ch2', label: 'Глава 2. Продвинутые темы', level: 2 as const },
  { id: 'ch2-1', href: '#ch2-1', label: 'Оптимизация', level: 3 as const },
  { id: 'outro', href: '#outro', label: 'Заключение', level: 2 as const },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    title: 'Содержание',
  },
};

export const WithActiveItem: Story = {
  args: {
    items: defaultItems,
    activeId: 'glava-1',
    title: 'Содержание',
  },
  parameters: {
    docs: {
      description: {
        story: 'Активный пункт выделен (жирный текст + вертикальная полоска слева).',
      },
    },
  },
};

/** Обёртка: страница статьи с боковым содержанием и привязкой к скроллу */
function ArticleWithTOC() {
  const sectionIds = defaultItems.map((i) => i.id);
  const activeId = useActiveSection(sectionIds, { offset: 120 });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr',
        gap: '2rem',
        alignItems: 'start',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <aside style={{ position: 'sticky', top: 24 }}>
        <TableOfContents items={defaultItems} activeId={activeId} />
      </aside>
      <article style={{ paddingBottom: '10rem' }}>
        <section id="vvedenie" style={{ marginBottom: '4rem' }}>
          <Typography variant="h2" as="h2" style={{ marginBottom: '1rem' }}>
            Введение
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </section>
        <section id="glava-1" style={{ marginBottom: '4rem' }}>
          <Typography variant="h2" as="h2" style={{ marginBottom: '1rem' }}>
            Глава 1. Основы
          </Typography>
          <Typography>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            Duis aute irure dolor in reprehenderit in voluptate.
          </Typography>
        </section>
        <section id="glava-2" style={{ marginBottom: '4rem' }}>
          <Typography variant="h2" as="h2" style={{ marginBottom: '1rem' }}>
            Глава 2. Продвинутые темы
          </Typography>
          <Typography>
            Excepteur sint occaecat cupidatat non proident. Sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Typography>
        </section>
        <section id="zaklyuchenie">
          <Typography variant="h2" as="h2" style={{ marginBottom: '1rem' }}>
            Заключение
          </Typography>
          <Typography>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium.
          </Typography>
        </section>
      </article>
    </div>
  );
}

export const WithScrollHighlight: Story = {
  render: () => <ArticleWithTOC />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Скролльте страницу вниз — активный пункт в содержании обновляется. Логика в `useActiveSection`, UI только отображает.',
      },
    },
  },
};

export const WithHierarchy: Story = {
  args: {
    items: itemsWithHierarchy,
    title: 'Содержание',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Иерархия по level: разделы (level 2) с отступом сверху, подразделы (level 3+) с отступом слева — визуально видно, что раздел, а что подраздел.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: 'Содержание',
  },
  parameters: {
    docs: {
      description: {
        story: 'Пустой список — компонент не рендерится.',
      },
    },
  },
};
