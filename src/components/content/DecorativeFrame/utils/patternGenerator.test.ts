/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import {
  getRandomInt,
  createSeededRandom,
  generatePattern,
  TRIANGLE_TEMPLATES,
  type CellConfig,
  type ShapeType,
} from './patternGenerator';

describe('getRandomInt', () => {
  const constantRng = (val: number) => () => val;

  it('возвращает целое число в диапазоне [min, max]', () => {
    expect(getRandomInt(0, 10, constantRng(0))).toBe(0);
    expect(getRandomInt(0, 10, constantRng(0.99))).toBe(10); // rng в [0, 1)
    expect(getRandomInt(5, 15, constantRng(0.5))).toBe(10);
  });

  it('включает оба граничных значения', () => {
    const rng = createSeededRandom(42);
    const results = new Set<number>();
    for (let i = 0; i < 100; i++) {
      results.add(getRandomInt(1, 3, rng));
    }
    expect(results.has(1)).toBe(true);
    expect(results.has(2)).toBe(true);
    expect(results.has(3)).toBe(true);
  });

  it('возвращает min при min === max', () => {
    expect(getRandomInt(7, 7, constantRng(0.5))).toBe(7);
  });
});

describe('createSeededRandom', () => {
  it('возвращает детерминированную последовательность для одного seed', () => {
    const rng1 = createSeededRandom(123);
    const rng2 = createSeededRandom(123);
    for (let i = 0; i < 10; i++) {
      expect(rng1()).toBe(rng2());
    }
  });

  it('возвращает разные последовательности для разных seed', () => {
    const rng1 = createSeededRandom(1);
    const rng2 = createSeededRandom(2);
    const seq1 = [rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2()];
    expect(seq1).not.toEqual(seq2);
  });

  it('возвращает числа в диапазоне [0, 1)', () => {
    const rng = createSeededRandom(999);
    for (let i = 0; i < 50; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });
});

describe('generatePattern', () => {
  const validCell = (cell: CellConfig): void => {
    expect(cell).toHaveProperty('x');
    expect(cell).toHaveProperty('y');
    expect(cell).toHaveProperty('width');
    expect(cell).toHaveProperty('height');
    expect(cell).toHaveProperty('bgColorIndex');
    expect(cell).toHaveProperty('shapeColorIndex');
    expect(cell).toHaveProperty('shapeType');
    expect(cell).toHaveProperty('animationDelay');
    expect(cell).toHaveProperty('animationDuration');
    expect(typeof cell.x).toBe('number');
    expect(typeof cell.y).toBe('number');
    expect(cell.width).toBeGreaterThan(0);
    expect(cell.height).toBeGreaterThan(0);
    expect(cell.bgColorIndex).toBeGreaterThanOrEqual(0);
    expect(cell.bgColorIndex).toBeLessThan(10);
    expect(cell.shapeColorIndex).toBeGreaterThanOrEqual(0);
    expect(cell.shapeColorIndex).toBeLessThan(10);
    expect(cell.bgColorIndex).not.toBe(cell.shapeColorIndex);
    const shapeTypes: ShapeType[] = ['circle', 'dot', 'triangle', 'diamond', 'cross', 'stripes', null];
    expect(shapeTypes).toContain(cell.shapeType);
  };

  it('возвращает детерминированный паттерн для краёв при одинаковом seed', () => {
    const rng = createSeededRandom(42);
    const cells1 = generatePattern(200, 64, 32, 10, rng);
    const rng2 = createSeededRandom(42);
    const cells2 = generatePattern(200, 64, 32, 10, rng2);
    expect(cells1.length).toBe(cells2.length);
    cells1.forEach((cell, i) => {
      expect(cell).toEqual(cells2[i]);
    });
  });

  it('возвращает детерминированный паттерн для разных edge при одинаковом seed', () => {
    const rng = createSeededRandom(100);
    const cells1 = generatePattern(80, 80, 20, 10, rng, 'left');
    const rng2 = createSeededRandom(100);
    const cells2 = generatePattern(80, 80, 20, 10, rng2, 'left');
    expect(cells1.length).toBe(cells2.length);
    cells1.forEach((cell, i) => {
      expect(cell).toEqual(cells2[i]);
    });
  });

  it('все ячейки имеют корректную структуру (край)', () => {
    const rng = createSeededRandom(777);
    const cells = generatePattern(120, 64, 32, 10, rng);
    expect(cells.length).toBeGreaterThan(0);
    cells.forEach(validCell);
  });

  it('разные edge возвращают непустые множества ячеек', () => {
    const rng = createSeededRandom(1);
    const rightCells = generatePattern(64, 64, 16, 10, rng, 'right');
    const topCells = generatePattern(64, 64, 16, 10, rng, 'top');
    expect(rightCells.length).toBeGreaterThan(0);
    expect(topCells.length).toBeGreaterThan(0);
  });

  it('возвращает хотя бы одну ячейку при минимальных размерах', () => {
    const rng = createSeededRandom(1);
    const cells = generatePattern(10, 10, 20, 2, rng);
    expect(cells.length).toBeGreaterThanOrEqual(1);
    cells.forEach(validCell);
  });

  it('для shapes "stripes" есть stripeDirection и stripeCount', () => {
    const rng = createSeededRandom(5000);
    let stripeCell: CellConfig | undefined;
    for (let i = 0; i < 500; i++) {
      const cells = generatePattern(200, 64, 16, 10, rng);
      stripeCell = cells.find((c) => c.shapeType === 'stripes');
      if (stripeCell) break;
    }
    if (stripeCell) {
      expect([0, 1]).toContain(stripeCell.stripeDirection);
      expect(stripeCell.stripeCount).toBeGreaterThanOrEqual(2);
      expect(stripeCell.stripeCount).toBeLessThanOrEqual(5);
    }
  });

  it('для shapes "triangle" есть triangleIndex в допустимом диапазоне', () => {
    const rng = createSeededRandom(3000);
    let triangleCell: CellConfig | undefined;
    for (let i = 0; i < 500; i++) {
      const cells = generatePattern(200, 64, 16, 10, rng);
      triangleCell = cells.find((c) => c.shapeType === 'triangle');
      if (triangleCell) break;
    }
    if (triangleCell && triangleCell.triangleIndex !== undefined) {
      expect(triangleCell.triangleIndex).toBeGreaterThanOrEqual(0);
      expect(triangleCell.triangleIndex).toBeLessThan(TRIANGLE_TEMPLATES.length);
    }
  });

  it('возвращает [] при stripWidth <= 0', () => {
    const rng = createSeededRandom(42);
    expect(generatePattern(0, 64, 16, 10, rng)).toEqual([]);
    expect(generatePattern(-10, 64, 16, 10, rng)).toEqual([]);
  });

  it('возвращает [] при stripHeight <= 0', () => {
    const rng = createSeededRandom(42);
    expect(generatePattern(64, 0, 16, 10, rng)).toEqual([]);
    expect(generatePattern(64, -5, 16, 10, rng)).toEqual([]);
  });

  it('все 4 edge возвращают валидные ячейки', () => {
    const edges: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left'];
    for (const edge of edges) {
      const rng = createSeededRandom(100 + edges.indexOf(edge));
      const cells = generatePattern(80, 80, 20, 10, rng, edge);
      expect(cells.length).toBeGreaterThan(0);
      cells.forEach(validCell);
    }
  });

  it('ячейки для right занимают правую часть strip', () => {
    const stripWidth = 120;
    const stripHeight = 48;
    const cellSize = 24;
    const rng = createSeededRandom(200);
    const cells = generatePattern(stripWidth, stripHeight, cellSize, 10, rng, 'right');
    expect(cells.length).toBeGreaterThan(0);
    const maxRight = Math.max(...cells.map((c) => c.x + c.width));
    expect(maxRight).toBeLessThanOrEqual(stripWidth + 1);
    expect(maxRight).toBeGreaterThan(stripWidth / 2);
  });

  it('ячейки для left занимают левую часть strip', () => {
    const stripWidth = 120;
    const stripHeight = 48;
    const cellSize = 24;
    const rng = createSeededRandom(200);
    const cells = generatePattern(stripWidth, stripHeight, cellSize, 10, rng, 'left');
    expect(cells.length).toBeGreaterThan(0);
    const minLeft = Math.min(...cells.map((c) => c.x));
    expect(minLeft).toBeGreaterThanOrEqual(0);
    expect(minLeft).toBeLessThan(stripWidth / 2);
  });

  it('ячейки для top занимают верхнюю часть strip', () => {
    const stripWidth = 48;
    const stripHeight = 120;
    const cellSize = 24;
    const rng = createSeededRandom(200);
    const cells = generatePattern(stripWidth, stripHeight, cellSize, 10, rng, 'top');
    expect(cells.length).toBeGreaterThan(0);
    const minTop = Math.min(...cells.map((c) => c.y));
    expect(minTop).toBeGreaterThanOrEqual(0);
    expect(minTop).toBeLessThan(stripHeight / 2);
  });

  it('ячейки для bottom занимают нижнюю часть strip', () => {
    const stripWidth = 48;
    const stripHeight = 120;
    const cellSize = 24;
    const rng = createSeededRandom(200);
    const cells = generatePattern(stripWidth, stripHeight, cellSize, 10, rng, 'bottom');
    expect(cells.length).toBeGreaterThan(0);
    const maxBottom = Math.max(...cells.map((c) => c.y + c.height));
    expect(maxBottom).toBeLessThanOrEqual(stripHeight + 1);
    expect(maxBottom).toBeGreaterThan(stripHeight / 2);
  });

  it('stripDensity влияет на результат', () => {
    const rng1 = createSeededRandom(50);
    const rng2 = createSeededRandom(50);
    const cells1 = generatePattern(120, 64, 16, 10, rng1, 'right', 2);
    const cells2 = generatePattern(120, 64, 16, 10, rng2, 'right', 6);
    expect(cells1.length).not.toBe(cells2.length);
  });

  it('для stripes stripeMask имеет длину stripeCount', () => {
    const rng = createSeededRandom(5555);
    let stripeCell: CellConfig | undefined;
    for (let i = 0; i < 300; i++) {
      const cells = generatePattern(200, 64, 16, 10, rng);
      stripeCell = cells.find((c) => c.shapeType === 'stripes');
      if (stripeCell?.stripeMask) break;
    }
    if (stripeCell?.stripeMask && stripeCell.stripeCount != null) {
      expect(stripeCell.stripeMask).toHaveLength(stripeCell.stripeCount);
    }
  });

  it('для dot dotScale в диапазоне [0.3, 0.6]', () => {
    const rng = createSeededRandom(8888);
    let dotCell: CellConfig | undefined;
    for (let i = 0; i < 300; i++) {
      const cells = generatePattern(200, 64, 16, 10, rng);
      dotCell = cells.find((c) => c.shapeType === 'dot');
      if (dotCell?.dotScale != null) break;
    }
    if (dotCell?.dotScale != null) {
      expect(dotCell.dotScale).toBeGreaterThanOrEqual(0.3);
      expect(dotCell.dotScale).toBeLessThan(0.61);
    }
  });

  it('все ячейки имеют animationScaleFrom в разумном диапазоне', () => {
    const rng = createSeededRandom(111);
    const cells = generatePattern(100, 64, 16, 10, rng);
    cells.forEach((cell) => {
      const scale = cell.animationScaleFrom ?? 0.9;
      expect(scale).toBeGreaterThanOrEqual(0.8);
      expect(scale).toBeLessThan(1);
    });
  });
});

describe('TRIANGLE_TEMPLATES', () => {
  it('содержит 4 шаблона треугольников', () => {
    expect(TRIANGLE_TEMPLATES).toHaveLength(4);
  });

  it('каждый шаблон — массив из 3 точек [x, y]', () => {
    TRIANGLE_TEMPLATES.forEach((template, i) => {
      expect(template).toHaveLength(3);
      template.forEach((pt, j) => {
        expect(pt).toHaveLength(2);
        expect(typeof pt[0]).toBe('number');
        expect(typeof pt[1]).toBe('number');
      });
    });
  });
});
