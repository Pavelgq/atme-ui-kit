import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from './Carousel';

beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

const slides = [<div key="1">Первый</div>, <div key="2">Второй</div>, <div key="3">Третий</div>];

describe('Carousel', () => {
  it('рендерит все переданные слайды', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByText('Первый')).toBeInTheDocument();
    expect(screen.getByText('Второй')).toBeInTheDocument();
    expect(screen.getByText('Третий')).toBeInTheDocument();
  });

  it('имеет доступную роль карусели', () => {
    render(<Carousel ariaLabel="Тестовая карусель">{slides}</Carousel>);
    expect(screen.getByRole('region', { name: 'Тестовая карусель' })).toBeInTheDocument();
  });

  it('первая стрелка «назад» задизейблена без loop', () => {
    render(<Carousel>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Предыдущий слайд' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Следующий слайд' })).toBeEnabled();
  });

  it('клик по стрелке «вперёд» скроллит к следующему слайду', async () => {
    const user = userEvent.setup();
    render(<Carousel>{slides}</Carousel>);
    await user.click(screen.getByRole('button', { name: 'Следующий слайд' }));
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('вызывает onIndexChange при переключении слайда', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(<Carousel onIndexChange={onIndexChange}>{slides}</Carousel>);
    await user.click(screen.getByRole('button', { name: 'Следующий слайд' }));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('в управляемом режиме использует переданный index', () => {
    render(
      <Carousel index={2} showDots>
        {slides}
      </Carousel>
    );
    expect(screen.getByRole('button', { name: 'Слайд 3' })).toHaveAttribute('aria-current', 'true');
  });

  it('без loop не даёт уйти за границы: onIndexChange не вызывается на последнем слайде', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Carousel index={2} onIndexChange={onIndexChange}>
        {slides}
      </Carousel>
    );
    const nextButton = screen.getByRole('button', { name: 'Следующий слайд' });
    expect(nextButton).toBeDisabled();
    await user.click(nextButton);
    expect(onIndexChange).not.toHaveBeenCalled();
  });

  it('с loop зацикливает переход с последнего слайда на первый', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Carousel index={2} loop onIndexChange={onIndexChange}>
        {slides}
      </Carousel>
    );
    await user.click(screen.getByRole('button', { name: 'Следующий слайд' }));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('показывает точки-пагинацию только при showDots', () => {
    const { rerender } = render(<Carousel showDots={false}>{slides}</Carousel>);
    expect(screen.queryByRole('button', { name: 'Слайд 1' })).not.toBeInTheDocument();

    rerender(<Carousel showDots>{slides}</Carousel>);
    expect(screen.getByRole('button', { name: 'Слайд 1' })).toBeInTheDocument();
  });

  it('не рендерит стрелки/точки при единственном слайде', () => {
    render(
      <Carousel showDots>
        <div>Единственный</div>
      </Carousel>
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('принимает testId и className', () => {
    render(
      <Carousel testId="my-carousel" className="custom">
        {slides}
      </Carousel>
    );
    const root = screen.getByTestId('my-carousel');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('custom');
  });
});
