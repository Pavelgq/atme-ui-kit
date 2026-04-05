import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/primitives/Button/Button';
import { Badge } from '../components/primitives/Badge/Badge';
import { Tag } from '../components/primitives/Tag/Tag';

const CONTENT_FONT = 'var(--typography-font-family-content)';

const meta: Meta = {
  title: 'Introduction/Font Pairing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Два шрифта, одна система

UI-кит использует два шрифта с разными ролями:

**Martian Grotesk** — интерфейсный. Технический, точный, немного ретро. Всё что пользователь нажимает, выбирает, управляет: кнопки, теги, навигация, формы.

**Lora** — контентный. Тёплый, литературный, с засечками. Отлично читается в длинных текстах: статьи блога, описания, цитаты, условия.

### CSS-переменные

| Переменная | Значение |
|---|---|
| \`--typography-font-family\` | Martian Grotesk |
| \`--typography-font-family-content\` | Lora |

### Подключение Lora

Добавь в \`<head>\` своего проекта:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link
  href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
  rel="stylesheet"
>
\`\`\`

Или через CSS-импорт:

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap';
        document.head.appendChild(link);
        return () => {
          if (document.head.contains(link)) document.head.removeChild(link);
        };
      }, []);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  name: 'Martian Grotesk + Lora',
  render: () => (
    <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{
          fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          fontWeight: 600, color: 'var(--palette-text-secondary)',
        }}>
          Introduction · Typography System
        </span>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: 'var(--palette-text-primary)', lineHeight: 1.3 }}>
          Два шрифта, одна система
        </h1>
        <p style={{ margin: 0, color: 'var(--palette-text-secondary)', fontSize: '0.9375rem', maxWidth: '58ch', lineHeight: 1.65 }}>
          Интерфейсный Martian Grotesk — для всего что нажимают.
          Контентный Lora — для всего что читают.
        </p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--palette-border-subtle)', margin: 0 }} />

      {/* Split demo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>

        {/* LEFT: article / Lora */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--palette-text-secondary)',
          }}>
            Контент — Lora
          </span>

          <article style={{ fontFamily: CONTENT_FONT, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{
              fontFamily: 'var(--typography-font-family)',
              fontSize: '0.75rem', letterSpacing: '0.06em',
              color: 'var(--palette-text-secondary)', textTransform: 'uppercase', fontWeight: 500,
            }}>
              Блог · 4 мин чтения
            </span>

            <h2 style={{
              margin: 0, fontFamily: CONTENT_FONT,
              fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3,
              color: 'var(--palette-text-primary)',
            }}>
              О том, почему хорошие шрифты важнее, чем кажется
            </h2>

            <p style={{
              margin: 0, fontFamily: CONTENT_FONT,
              fontSize: '1.0625rem', lineHeight: 1.75,
              color: 'var(--palette-text-secondary)', fontStyle: 'italic',
            }}>
              Первое, что замечает читатель — не цвет и не отступы.
              Это ритм строк и характер букв. Хороший шрифт исчезает; плохой мешает.
            </p>

            <p style={{
              margin: 0, fontFamily: CONTENT_FONT,
              fontSize: '1rem', lineHeight: 1.75, color: 'var(--palette-text-primary)',
            }}>
              Сериф в длинном тексте работает как рельсы: взгляд движется по засечкам
              и не соскальзывает. Гротеск — это скорость и чёткость, идеал для интерфейса,
              но утомляет в больших объёмах.
            </p>

            <blockquote style={{
              margin: '4px 0',
              paddingLeft: 16,
              borderLeft: '3px solid var(--palette-primary-main)',
              color: 'var(--palette-text-secondary)',
              fontFamily: CONTENT_FONT,
              fontStyle: 'italic',
              fontSize: '1.0625rem',
              lineHeight: 1.65,
            }}>
              «Типографика — это голос текста. Она молчит, пока работает,
              и кричит, когда ломается.»
            </blockquote>
          </article>
        </div>

        {/* RIGHT: UI panel / Martian Grotesk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--palette-text-secondary)',
          }}>
            Интерфейс — Martian Grotesk
          </span>

          <div style={{
            background: 'var(--palette-background-paper)',
            border: '2px solid var(--palette-border-default)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 24,
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--palette-text-primary)' }}>
                Редактор статьи
              </span>
              <Badge variant="warning" size="sm">Черновик</Badge>
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Tag variant="primary">Дизайн</Tag>
              <Tag variant="secondary">Типографика</Tag>
              <Tag variant="neutral">UI Kit</Tag>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button size="sm">Опубликовать</Button>
              <Button size="sm" variant="secondary">Сохранить</Button>
              <Button size="sm" variant="ghost">Предпросмотр</Button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--palette-border-subtle)', margin: 0 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--palette-text-secondary)' }}>
                Статистика черновика
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Badge variant="neutral" size="sm">4 минуты</Badge>
                <Badge variant="success" size="sm">852 слова</Badge>
                <Badge variant="secondary" size="sm">3 правки</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--palette-border-subtle)', margin: 0 }} />

      {/* Specimens */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--palette-text-secondary)',
          }}>
            Martian Grotesk · Sans-serif
          </span>
          <div style={{ fontSize: '2.25rem', fontWeight: 500, color: 'var(--palette-text-primary)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            Aa Бб Вв Гг
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--palette-text-secondary)', lineHeight: 1.6 }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 4, fontSize: '0.8125rem', color: 'var(--palette-text-secondary)' }}>
            <span style={{ fontWeight: 400 }}>Normal</span>
            <span style={{ fontWeight: 500 }}>Medium</span>
            <span style={{ fontWeight: 600 }}>Semibold</span>
            <span style={{ fontWeight: 700 }}>Bold</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            fontWeight: 600, color: 'var(--palette-text-secondary)',
          }}>
            Lora · Serif
          </span>
          <div style={{ fontFamily: CONTENT_FONT, fontSize: '2.25rem', fontWeight: 500, color: 'var(--palette-text-primary)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            Aa Бб Вв Гг
          </div>
          <div style={{ fontFamily: CONTENT_FONT, fontSize: '0.875rem', color: 'var(--palette-text-secondary)', lineHeight: 1.6 }}>
            The quick brown fox jumps over the lazy dog
          </div>
          <div style={{ fontFamily: CONTENT_FONT, display: 'flex', gap: 16, marginTop: 4, fontSize: '0.8125rem', color: 'var(--palette-text-secondary)' }}>
            <span style={{ fontWeight: 400 }}>Normal</span>
            <span style={{ fontWeight: 500 }}>Medium</span>
            <span style={{ fontStyle: 'italic' }}>Italic</span>
            <span style={{ fontWeight: 600 }}>Semibold</span>
          </div>
        </div>
      </div>

    </div>
  ),
};
