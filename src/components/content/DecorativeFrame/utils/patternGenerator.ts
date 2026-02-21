export type Point2D = [number, number];

export const TRIANGLE_TEMPLATES: Point2D[][] = [
  [[0, 0], [1, 0], [0, 1]],
  [[0, 0], [1, 0], [1, 1]],
  [[0, 0], [0, 1], [1, 1]],
  [[0, 1], [1, 0], [1, 1]],
];

export type ShapeType =
  | 'circle'
  | 'dot'
  | 'triangle'
  | 'diamond'
  | 'cross'
  | 'stripes'
  | null;

export interface CellConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  bgColorIndex: number;
  shapeColorIndex: number;
  shapeType: ShapeType;
  triangleIndex?: number;
  stripeDirection?: 0 | 1;
  stripeCount?: number;
  stripeMask?: boolean[];
  animationDelay: number;
  animationDuration: number;
  animationScaleFrom?: number;
  dotScale?: number;
  animationType?: 'breathe' | 'pulse' | 'opacity';
  animationPhase?: number;
}

const RNG_MULTIPLIER = 9301;
const RNG_INCREMENT = 49297;
const RNG_MODULUS = 233280;

const MIN_BOX_SIZE = 4;
const STRIP_LINES_MIN = 1;
const STRIP_LINES_MAX = 8;
const EMPTY_ROW_CHANCE = 0.12;
const FILL_COUNT_MIN_RATIO = 0.3;

const SHAPE_PROB = { circle: 0.2, dot: 0.35, triangle: 0.5, diamond: 0.62, cross: 0.75 } as const;
const DOT_SCALE_MIN = 0.3;
const DOT_SCALE_RANGE = 0.3;
const ANIM_DELAY_MAX = 450;
const ANIM_DURATION_MIN = 320;
const ANIM_DURATION_RANGE = 300;
const ANIM_SCALE_FROM_MIN = 0.8;
const ANIM_SCALE_FROM_RANGE = 0.17;
// Animation
const ANIM_BREATHE_CHANCE = 0.25;
const ANIM_PULSE_CHANCE = 0.25;
const ANIM_OPACITY_CHANCE = 0.25;
const ANIM_PHASE_MAX = 7000;
const STRIPE_COUNT_MIN = 2;
const STRIPE_COUNT_MAX = 5;
const STRIPE_VISIBLE_CHANCE = 0.75;

export function getRandomInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function createSeededRandom(seed: number): () => number {
  return () => {
    seed = (seed * RNG_MULTIPLIER + RNG_INCREMENT) % RNG_MODULUS;
    return seed / RNG_MODULUS;
  };
}

export type PatternEdge = 'top' | 'right' | 'bottom' | 'left';

export function generatePattern(
  stripWidth: number,
  stripHeight: number,
  boxSize: number,
  colorCount: number,
  rng: () => number,
  edge: PatternEdge = 'right',
  stripDensity: number = 2
): CellConfig[] {
  return generateEdgePattern(stripWidth, stripHeight, boxSize, colorCount, rng, edge, stripDensity);
}

function generateEdgePattern(
  stripWidth: number,
  stripHeight: number,
  boxSize: number,
  colorCount: number,
  rng: () => number,
  edge: PatternEdge,
  stripDensity: number
): CellConfig[] {
  if (stripWidth <= 0 || stripHeight <= 0) return [];

  const safeBoxSize = Math.max(MIN_BOX_SIZE, boxSize);
  const maxRows = Math.max(STRIP_LINES_MIN, Math.floor(stripHeight / safeBoxSize));
  const minLines = Math.min(STRIP_LINES_MAX, Math.max(STRIP_LINES_MIN, stripDensity));

  let rowCount = 1;
  while (rowCount < maxRows && stripHeight / (rowCount + 1) >= safeBoxSize) {
    rowCount++;
  }

  let cellSize = stripHeight / rowCount;
  if (cellSize > stripWidth) {
    cellSize = stripWidth;
    rowCount = Math.max(STRIP_LINES_MIN, Math.floor(stripHeight / cellSize));
  }

  const maxCellByWidth = stripWidth / minLines;
  const maxCellByHeight = stripHeight / minLines;
  cellSize = Math.min(cellSize, maxCellByWidth, maxCellByHeight);
  if (cellSize <= 0) return [];

  rowCount = Math.max(STRIP_LINES_MIN, Math.floor(stripHeight / cellSize));
  const colCount = Math.max(STRIP_LINES_MIN, Math.floor(stripWidth / cellSize));

  const shouldFill = () => rng() > EMPTY_ROW_CHANCE;
  const fillCount = (max: number) =>
    getRandomInt(Math.max(STRIP_LINES_MIN, Math.floor(max * FILL_COUNT_MIN_RATIO)), max, rng);

  const isVerticalStrip = edge === 'right' || edge === 'left';
  const primaryCount = isVerticalStrip ? rowCount : colCount;
  const secondaryCount = isVerticalStrip ? colCount : rowCount;
  const isEndEdge = edge === 'right' || edge === 'bottom';

  const cells: CellConfig[] = [];

  for (let i = 0; i < primaryCount; i++) {
    if (!shouldFill()) continue;

    const count = fillCount(secondaryCount);
    const start = isEndEdge ? secondaryCount - count : 0;
    const end = isEndEdge ? secondaryCount : count;

    for (let j = start; j < end; j++) {
      const col = isVerticalStrip ? j : i;
      const row = isVerticalStrip ? i : j;
      pushCell(cells, col * cellSize, row * cellSize, cellSize, cellSize, colorCount, rng);
    }
  }

  return cells;
}

function pickShapeType(rng: () => number): {
  shapeType: ShapeType;
  triangleIndex?: number;
  stripeDirection?: 0 | 1;
  stripeCount?: number;
  stripeMask?: boolean[];
  dotScale?: number;
} {
  const roll = rng();

  if (roll < SHAPE_PROB.circle) return { shapeType: 'circle' };
  if (roll < SHAPE_PROB.dot) {
    return { shapeType: 'dot', dotScale: DOT_SCALE_MIN + rng() * DOT_SCALE_RANGE };
  }
  if (roll < SHAPE_PROB.triangle) {
    return {
      shapeType: 'triangle',
      triangleIndex: getRandomInt(0, TRIANGLE_TEMPLATES.length - 1, rng),
    };
  }
  if (roll < SHAPE_PROB.diamond) return { shapeType: 'diamond' };
  if (roll < SHAPE_PROB.cross) return { shapeType: 'cross' };

  const stripeCount = getRandomInt(STRIPE_COUNT_MIN, STRIPE_COUNT_MAX, rng);
  return {
    shapeType: 'stripes',
    stripeDirection: rng() > 0.35 ? 1 : 0,
    stripeCount,
    stripeMask: Array.from({ length: stripeCount }, () => rng() > 1 - STRIPE_VISIBLE_CHANCE),
  };
}

function pushCell(
  cells: CellConfig[],
  x: number,
  y: number,
  width: number,
  height: number,
  colorCount: number,
  rng: () => number
): void {
  const bgColorIndex = getRandomInt(0, colorCount - 1, rng);
  let shapeColorIndex = getRandomInt(0, colorCount - 1, rng);
  while (shapeColorIndex === bgColorIndex) {
    shapeColorIndex = getRandomInt(0, colorCount - 1, rng);
  }

  const shape = pickShapeType(rng);

  const roll = rng();
  let animationType: 'breathe' | 'pulse' | 'opacity' | undefined;
  if (roll < ANIM_BREATHE_CHANCE) animationType = 'breathe';
  else if (roll < ANIM_BREATHE_CHANCE + ANIM_PULSE_CHANCE) animationType = 'pulse';
  else if (roll < ANIM_BREATHE_CHANCE + ANIM_PULSE_CHANCE + ANIM_OPACITY_CHANCE) animationType = 'opacity';

  cells.push({
    x,
    y,
    width,
    height,
    bgColorIndex,
    shapeColorIndex,
    shapeType: shape.shapeType,
    triangleIndex: shape.triangleIndex,
    stripeDirection: shape.stripeDirection,
    stripeCount: shape.stripeCount,
    stripeMask: shape.stripeMask,
    animationDelay: Math.floor(rng() * ANIM_DELAY_MAX),
    animationDuration: ANIM_DURATION_MIN + Math.floor(rng() * ANIM_DURATION_RANGE),
    animationScaleFrom: ANIM_SCALE_FROM_MIN + rng() * ANIM_SCALE_FROM_RANGE,
    dotScale: shape.dotScale,
    animationType,
    animationPhase: animationType ? Math.floor(rng() * ANIM_PHASE_MAX) : undefined,
  });
}
