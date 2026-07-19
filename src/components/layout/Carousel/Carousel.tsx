import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { getSpacingVar } from '@tokens/utils';
import type { BaseComponentProps } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from '../../primitives/Icon/Icons';
import styles from './Carousel.module.pcss';

export type CarouselGap = number | string;

export type CarouselItemsPerView =
  | number
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      '2xl'?: number;
    };

export interface CarouselProps
  extends BaseComponentProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Слайды карусели — любой контент: карточки, статьи, изображения и т.д. */
  children: React.ReactNode;
  /** Сколько слайдов показывать одновременно, можно задать по брейкпоинтам */
  itemsPerView?: CarouselItemsPerView;
  gap?: CarouselGap;
  /** Зацикливать переход со последнего слайда на первый и обратно */
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  /** Управляемый индекс активного слайда */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  ariaLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      itemsPerView = 1,
      gap = 4,
      loop = false,
      showArrows = true,
      showDots = false,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      ariaLabel = 'Карусель',
      prevLabel = 'Предыдущий слайд',
      nextLabel = 'Следующий слайд',
      className,
      testId,
      ...props
    },
    ref
  ) => {
    const slides = useMemo(() => React.Children.toArray(children), [children]);
    const count = slides.length;

    const isControlled = indexProp !== undefined;
    const [uncontrolledIndex, setUncontrolledIndex] = useState(
      clamp(defaultIndex, 0, Math.max(count - 1, 0))
    );
    const activeIndex = clamp(
      isControlled ? (indexProp as number) : uncontrolledIndex,
      0,
      Math.max(count - 1, 0)
    );

    const trackRef = useRef<HTMLDivElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const activeIndexRef = useRef(activeIndex);
    activeIndexRef.current = activeIndex;

    const goTo = useCallback(
      (nextIndex: number, behavior: ScrollBehavior = 'smooth') => {
        const boundedIndex = loop ? (nextIndex + count) % count : clamp(nextIndex, 0, count - 1);

        if (!isControlled) setUncontrolledIndex(boundedIndex);
        onIndexChange?.(boundedIndex);

        const slideEl = slideRefs.current[boundedIndex];
        slideEl?.scrollIntoView({ behavior, inline: 'start', block: 'nearest' });
      },
      [count, isControlled, loop, onIndexChange]
    );

    const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
    const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

    const handleTrackKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          handlePrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          handleNext();
        }
      },
      [handleNext, handlePrev]
    );

    // Синхронизируем индекс с реальной позицией скролла (свайп, трекпад, колесо мыши,
    // а также плавный скролл от стрелок/точек). Считаем ближайший слайд только когда
    // скролл затих — во время самой анимации scrollLeft ещё «в пути» и даёт мусорные
    // промежуточные индексы, из-за которых точки дребезжали туда-сюда.
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      let settleTimeoutId: ReturnType<typeof setTimeout> | null = null;

      const handleScroll = () => {
        if (settleTimeoutId !== null) clearTimeout(settleTimeoutId);
        settleTimeoutId = setTimeout(() => {
          const trackLeft = track.scrollLeft;
          let closestIndex = 0;
          let closestDistance = Infinity;
          slideRefs.current.forEach((slideEl, i) => {
            if (!slideEl) return;
            const distance = Math.abs(slideEl.offsetLeft - trackLeft);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          });
          if (closestIndex === activeIndexRef.current) return;
          if (!isControlled) setUncontrolledIndex(closestIndex);
          onIndexChange?.(closestIndex);
        }, 100);
      };

      track.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        track.removeEventListener('scroll', handleScroll);
        if (settleTimeoutId !== null) clearTimeout(settleTimeoutId);
      };
    }, [isControlled, onIndexChange]);

    // При смене управляемого индекса извне — доскроллить до него.
    useEffect(() => {
      if (!isControlled) return;
      const slideEl = slideRefs.current[activeIndex];
      slideEl?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      // eslint-disable-next-line react-hooks/exhaustive-deps -- скроллим только при внешней смене индекса
    }, [indexProp]);

    const gapValue = getSpacingVar(gap) ?? '0px';

    const cssVars: Record<string, string> = { '--carousel-gap': gapValue };
    if (typeof itemsPerView === 'number') {
      cssVars['--carousel-cols-xs'] = String(itemsPerView);
    } else {
      if (itemsPerView.xs !== undefined) cssVars['--carousel-cols-xs'] = String(itemsPerView.xs);
      if (itemsPerView.sm !== undefined) cssVars['--carousel-cols-sm'] = String(itemsPerView.sm);
      if (itemsPerView.md !== undefined) cssVars['--carousel-cols-md'] = String(itemsPerView.md);
      if (itemsPerView.lg !== undefined) cssVars['--carousel-cols-lg'] = String(itemsPerView.lg);
      if (itemsPerView.xl !== undefined) cssVars['--carousel-cols-xl'] = String(itemsPerView.xl);
      if (itemsPerView['2xl'] !== undefined)
        cssVars['--carousel-cols-2xl'] = String(itemsPerView['2xl']);
    }

    const canGoPrev = loop || activeIndex > 0;
    const canGoNext = loop || activeIndex < count - 1;

    return (
      <div
        ref={ref}
        data-atme-ui
        className={cn(styles.carousel, className)}
        style={cssVars as React.CSSProperties}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        {...(testId && { 'data-testid': testId })}
        {...props}
      >
        <div className={styles.viewport}>
          {showArrows && count > 1 && (
            <button
              type="button"
              className={cn(styles.arrow, styles['arrow--prev'])}
              onClick={handlePrev}
              disabled={!canGoPrev}
              aria-label={prevLabel}
            >
              <ChevronLeftIcon decorative />
            </button>
          )}

          <div
            ref={trackRef}
            className={styles.track}
            tabIndex={count > 1 ? 0 : -1}
            onKeyDown={handleTrackKeyDown}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className={styles.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${count}`}
              >
                {slide}
              </div>
            ))}
          </div>

          {showArrows && count > 1 && (
            <button
              type="button"
              className={cn(styles.arrow, styles['arrow--next'])}
              onClick={handleNext}
              disabled={!canGoNext}
              aria-label={nextLabel}
            >
              <ChevronRightIcon decorative />
            </button>
          )}
        </div>

        {showDots && count > 1 && (
          <div className={styles.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cn(styles.dot, i === activeIndex && styles['dot--active'])}
                onClick={() => goTo(i)}
                aria-label={`Слайд ${i + 1}`}
                aria-current={i === activeIndex}
              />
            ))}
          </div>
        )}

        <span className={styles.srOnly} aria-live="polite">
          Слайд {activeIndex + 1} из {count}
        </span>
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';
