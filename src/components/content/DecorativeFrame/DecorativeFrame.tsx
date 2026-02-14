import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { Root } from '@components/primitives/Root';
import { BaseComponentProps } from '@components/types';
import { PatternCell } from './components/PatternCell';
import { createSeededRandom, generatePattern } from './utils/patternGenerator';
import styles from './DecorativeFrame.module.pcss';

const CELL_SIZE = 24;
const STRIP_DENSITY_MIN = 1;
const STRIP_DENSITY_MAX = 8;
const STRIP_EXTEND_FALLBACK = 400;
const RANDOM_SEED_RANGE = 1e6;

export type DecorativeFrameEdge = 'top' | 'right' | 'bottom' | 'left';
export type DecorativeFrameDirection = 'external' | 'internal';

export interface DecorativeFrameProps
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Сторона для декоративной полосы */
  edge?: DecorativeFrameEdge;
  /** external — наружу, internal — внутрь */
  direction?: DecorativeFrameDirection;
  /** Размер ячейки паттерна (px) */
  boxSize?: number;
  /** Ячеек по толщине полосы (1–8). Ячейка 24×24 */
  stripDensity?: number;
  /** Палитра цветов */
  colors?: string[];
  /** Seed для детерминированной генерации */
  seed?: number;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const DEFAULT_COLORS = [
  'var(--palette-border-subtle)',
  'var(--palette-background-accent)',
  'var(--palette-border-default)',
  'var(--palette-secondary-main)',
  'var(--palette-secondary-hover)',
  'var(--palette-primary-main)',
  'var(--palette-primary-hover)',
  'var(--palette-text-secondary)',
  'var(--palette-background-default)',
  'transparent',
];

function clampStripDensity(value: number): number {
  return Math.min(STRIP_DENSITY_MAX, Math.max(STRIP_DENSITY_MIN, value));
}

function getStripDimensions(
  stripSize: { width: number; height: number } | null,
  isVertical: boolean,
  thickness: number
): { width: number; height: number } {
  if (stripSize && stripSize.width > 0 && stripSize.height > 0) {
    return stripSize;
  }
  return isVertical
    ? { width: STRIP_EXTEND_FALLBACK, height: thickness }
    : { width: thickness, height: STRIP_EXTEND_FALLBACK };
}

export function DecorativeFrame({
  edge = 'right',
  direction = 'external',
  boxSize = 32,
  stripDensity = 2,
  colors = DEFAULT_COLORS,
  seed,
  children,
  className,
  contentClassName,
  contentStyle,
  testId,
  ...rest
}: DecorativeFrameProps) {
  const { style: restStyle, ...restProps } = rest;
  const baseSeedRef = useRef(seed ?? Math.floor(Date.now() + Math.random() * RANDOM_SEED_RANGE));
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripSize, setStripSize] = useState<{ width: number; height: number } | null>(null);

  const isVertical = edge === 'top' || edge === 'bottom';
  const safeDensity = clampStripDensity(stripDensity ?? 2);
  const thickness = CELL_SIZE * safeDensity;

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setStripSize({ width, height });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [edge]);

  const cells = useMemo(() => {
    const { width, height } = getStripDimensions(stripSize, isVertical, thickness);
    const rng = createSeededRandom(baseSeedRef.current);
    return generatePattern(width, height, boxSize, colors.length, rng, edge, safeDensity);
  }, [boxSize, safeDensity, colors.length, edge, stripSize, isVertical, thickness]);

  const deferredCells = useDeferredValue(cells);

  const stripStyle = isVertical
    ? { height: thickness }
    : { width: thickness, minHeight: CELL_SIZE };

  const stripContent = (
    <div
      ref={stripRef}
      className={cn(styles.strip, styles[`strip--${edge}`], direction === 'internal' && styles.stripMirror)}
      style={stripStyle}
      aria-hidden
    >
      {deferredCells.map((cell) => (
        <PatternCell key={`${cell.x}-${cell.y}`} cell={cell} colors={colors} />
      ))}
    </div>
  );

  return (
    <Root
      as="div"
      className={cn(styles.root, styles[`root--edge-${edge}`], className)}
      style={restStyle}
      testId={testId}
      {...restProps}
    >
      {edge === 'top' && stripContent}
      {edge === 'left' && stripContent}
      <div className={cn(styles.content, contentClassName)} style={contentStyle}>
        {children}
      </div>
      {edge === 'right' && stripContent}
      {edge === 'bottom' && stripContent}
    </Root>
  );
}

DecorativeFrame.displayName = 'DecorativeFrame';
