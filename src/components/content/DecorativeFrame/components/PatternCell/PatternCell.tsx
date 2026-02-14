import React from 'react';
import type { CellConfig, Point2D } from '../../utils/patternGenerator';
import { TRIANGLE_TEMPLATES } from '../../utils/patternGenerator';
import styles from './PatternCell.module.pcss';

export interface PatternCellProps {
  cell: CellConfig;
  colors: string[];
}

function polygonClipPath(template: Point2D[]): string {
  const points = template.map(([px, py]) => `${px * 100}% ${py * 100}%`).join(', ');
  return `polygon(${points})`;
}

export function PatternCell({ cell, colors }: PatternCellProps) {
  const bgColor = colors[cell.bgColorIndex] ?? colors[0];
  const shapeColor = colors[cell.shapeColorIndex] ?? colors[1];
  const size = Math.min(cell.width, cell.height);
  const {
    x,
    y,
    width: cellWidth,
    height: cellHeight,
    shapeType,
    triangleIndex,
    stripeDirection,
    stripeCount = 4,
    stripeMask,
    animationDelay,
    animationDuration,
    animationScaleFrom = 0.9,
    dotScale = 0.45,
  } = cell;

  const stripeWidth =
    stripeDirection === 1 ? size : size / (stripeCount * 2 - 1);
  const stripeHeight =
    stripeDirection === 1 ? size / (stripeCount * 2 - 1) : size;
  const visibleStripes = stripeMask ?? Array(stripeCount).fill(true);

  const cellStyle: React.CSSProperties = {
    position: 'absolute',
    left: x,
    top: y,
    width: cellWidth,
    height: cellHeight,
    '--cell-delay': `${animationDelay}ms`,
    '--cell-duration': `${animationDuration}ms`,
    '--cell-scale-from': animationScaleFrom,
  } as React.CSSProperties;

  return (
    <div
      className={styles.cell}
      style={cellStyle}
      aria-hidden
    >
      <div className={styles.bg} style={{ backgroundColor: bgColor }} />

      {shapeType === 'circle' && (
        <div
          className={styles.shapeCircle}
          style={{ backgroundColor: shapeColor }}
        />
      )}

      {shapeType === 'dot' && (
        <div
          className={styles.shapeDot}
          style={{
            backgroundColor: shapeColor,
            width: `${dotScale * 100}%`,
            height: `${dotScale * 100}%`,
          }}
        />
      )}

      {shapeType === 'triangle' &&
        triangleIndex !== undefined &&
        TRIANGLE_TEMPLATES[triangleIndex] && (
          <div
            className={styles.shapeTriangle}
            style={{
              backgroundColor: shapeColor,
              clipPath: polygonClipPath(TRIANGLE_TEMPLATES[triangleIndex]!),
            }}
          />
        )}

      {shapeType === 'diamond' && (
        <div
          className={styles.shapeDiamond}
          style={{ backgroundColor: shapeColor }}
        />
      )}

      {shapeType === 'cross' && (
        <div className={styles.shapeCross}>
          <div
            className={styles.crossBar}
            style={{ backgroundColor: shapeColor }}
          />
          <div
            className={styles.crossBarVertical}
            style={{ backgroundColor: shapeColor }}
          />
        </div>
      )}

      {shapeType === 'stripes' && (
        <div className={styles.stripes}>
          {Array.from({ length: stripeCount }, (_, i) =>
            visibleStripes[i] ? (
              <div
                key={i}
                className={styles.stripe}
                style={{
                  backgroundColor: shapeColor,
                  ...(stripeDirection === 1
                  ? {
                      top: `${((2 * i * stripeHeight) / size) * 100}%`,
                      left: 0,
                      width: '100%',
                      height: `${(stripeHeight / size) * 100}%`,
                    }
                  : {
                      left: `${((2 * i * stripeWidth) / size) * 100}%`,
                      top: 0,
                      width: `${(stripeWidth / size) * 100}%`,
                      height: '100%',
                    }),
                }}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

PatternCell.displayName = 'PatternCell';
