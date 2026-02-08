import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LikeButton } from './LikeButton';

describe('LikeButton', () => {
  it('рендерится с доступной подписью', () => {
    render(<LikeButton />);
    const btn = screen.getByRole('button', { name: 'Поставить лайк' });
    expect(btn).toBeInTheDocument();
  });

  it('в состоянии liked имеет aria-pressed="true" и подпись «Убрать лайк»', () => {
    render(<LikeButton liked />);
    const btn = screen.getByRole('button', { name: 'Убрать лайк' });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('при клике вызывает onLike с true', async () => {
    const onLike = vi.fn();
    const user = userEvent.setup();
    render(<LikeButton onLike={onLike} />);
    await user.click(screen.getByRole('button'));
    expect(onLike).toHaveBeenCalledWith(true);
  });

  it('при клике в состоянии liked вызывает onLike с false', async () => {
    const onLike = vi.fn();
    const user = userEvent.setup();
    render(<LikeButton liked onLike={onLike} />);
    await user.click(screen.getByRole('button'));
    expect(onLike).toHaveBeenCalledWith(false);
  });

  it('показывает count рядом с сердечком', () => {
    render(<LikeButton count={99} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('в неуправляемом режиме переключает состояние по клику', async () => {
    const user = userEvent.setup();
    render(<LikeButton defaultLiked={false} />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('при disabled не вызывает onLike', async () => {
    const onLike = vi.fn();
    const user = userEvent.setup();
    render(<LikeButton disabled onLike={onLike} />);
    await user.click(screen.getByRole('button'));
    expect(onLike).not.toHaveBeenCalled();
  });

  it('принимает testId', () => {
    render(<LikeButton testId="like-btn" />);
    expect(screen.getByTestId('like-btn')).toBeInTheDocument();
  });

  it('принимает className', () => {
    const { container } = render(<LikeButton className="custom" />);
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('custom');
  });
});
