import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ArticlePreview } from './ArticlePreview';

describe('ArticlePreview', () => {
  const defaultProps = {
    title: 'Тестовая статья',
    publishedAt: '2025-02-05',
  };

  it('рендерит заголовок и дату', () => {
    render(<ArticlePreview {...defaultProps} />);
    expect(screen.getByText('Тестовая статья')).toBeInTheDocument();
    expect(screen.getByText(/5 февраля 2025/)).toBeInTheDocument();
  });

  it('рендерит с вариантом card по умолчанию', () => {
    const { container } = render(<ArticlePreview {...defaultProps} />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('class')).toMatch(/root--card/);
  });

  it('рендерит с вариантом row', () => {
    const { container } = render(<ArticlePreview {...defaultProps} view="row" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('class')).toMatch(/root--row/);
  });

  it('рендерит с вариантом card', () => {
    const { container } = render(<ArticlePreview {...defaultProps} view="card" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('class')).toMatch(/root--card/);
  });

  it('показывает описание при переданном description', () => {
    render(<ArticlePreview {...defaultProps} description="Краткое описание" />);
    expect(screen.getByText('Краткое описание')).toBeInTheDocument();
  });

  it('показывает счётчик просмотров при переданном viewsCount', () => {
    render(<ArticlePreview {...defaultProps} viewsCount={1234} />);
    expect(screen.getByText('1.2K')).toBeInTheDocument();
  });

  it('не показывает превью при отсутствии imageUrl в card', () => {
    const { container } = render(<ArticlePreview {...defaultProps} view="card" />);
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
  });

  it('показывает изображение при переданном imageUrl', () => {
    render(
      <ArticlePreview {...defaultProps} imageUrl="https://example.com/img.jpg" imageAlt="Превью" />
    );
    const img = screen.getByRole('img', { name: 'Превью' });
    expect(img).toHaveAttribute('src', 'https://example.com/img.jpg');
  });

  it('использует title как alt для изображения, если imageAlt не передан', () => {
    render(<ArticlePreview {...defaultProps} imageUrl="https://example.com/img.jpg" />);
    const img = screen.getByRole('img', { name: 'Тестовая статья' });
    expect(img).toBeInTheDocument();
  });

  it('добавляет title к заголовку для подсказки при наведении', () => {
    render(<ArticlePreview {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveAttribute('title', 'Тестовая статья');
  });

  it('при onClick помечает карточку как интерактивную (role=button)', () => {
    const onClick = vi.fn();
    render(<ArticlePreview {...defaultProps} onClick={onClick} />);
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
  });

  it('вызывает onClick при клике', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<ArticlePreview {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('принимает publishedAt как Date', () => {
    render(<ArticlePreview {...defaultProps} publishedAt={new Date('2025-03-15')} />);
    expect(screen.getByText(/15 марта 2025/)).toBeInTheDocument();
  });

  it('принимает testId', () => {
    render(<ArticlePreview {...defaultProps} testId="article-preview-1" />);
    expect(screen.getByTestId('article-preview-1')).toBeInTheDocument();
  });

  it('принимает className', () => {
    const { container } = render(<ArticlePreview {...defaultProps} className="custom" />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('custom');
  });

  it('при href вся карточка — ссылка с этим href', () => {
    render(<ArticlePreview {...defaultProps} href="/blog/post-1" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/post-1');
  });

  it('без href корень — div, не ссылка', () => {
    render(<ArticlePreview {...defaultProps} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('добавляет data-testid на корень при переданном testId', () => {
    render(<ArticlePreview {...defaultProps} href="/blog/1" testId="card-1" />);
    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-1').tagName).toBe('A');
  });

  it('рендерит слот tags в карточке', () => {
    render(
      <ArticlePreview
        {...defaultProps}
        view="card"
        tags={<span data-testid="card-tags">Метка</span>}
      />
    );
    expect(screen.getByTestId('card-tags')).toBeInTheDocument();
    expect(screen.getByText('Метка')).toBeInTheDocument();
  });

  it('рендерит слот tags в строке (над заголовком)', () => {
    render(
      <ArticlePreview
        {...defaultProps}
        view="row"
        tags={<span data-testid="card-tags">Тег</span>}
      />
    );
    expect(screen.getByTestId('card-tags')).toBeInTheDocument();
    expect(screen.getByText('Тег')).toBeInTheDocument();
  });
});
