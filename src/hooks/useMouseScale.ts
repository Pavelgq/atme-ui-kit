import { useCallback, RefObject } from "react";

const DISTANCE_MULTIPLIER = 4;
const WAY_COEFFICIENT = 1.5;
const WAY_QUADRATIC_COEFFICIENT = 0.1;

export interface UseMouseScaleOptions {
  itemRefs: RefObject<(HTMLElement | null)[]>;
  containerRef: RefObject<HTMLElement>;
  defaultSize: number;
  maxScale?: number;
  orientation?: "horizontal" | "vertical";
  animationClassName?: string;
}

export interface UseMouseScaleReturn {
  handleMouseEnter: () => void;
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
}

/**
 * Хук для создания интерактивного масштабирования элементов при движении мыши.
 * Элементы увеличиваются пропорционально близости курсора к их центру.
 *
 * @param options - Опции для настройки масштабирования
 * @returns Обработчики событий мыши для привязки к контейнеру
 */
export function useMouseScale({
  itemRefs,
  containerRef,
  defaultSize,
  maxScale = 1.5,
  orientation = "horizontal",
  animationClassName,
}: UseMouseScaleOptions): UseMouseScaleReturn {
  const handleMouseEnter = useCallback(() => {
    itemRefs.current?.forEach((item) => {
      if (item && animationClassName) {
        item.classList.add(animationClassName);
      }
    });
  }, [itemRefs, animationClassName]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!containerRef.current) return;

      const targetPos = orientation === "horizontal" ? e.clientX : e.clientY;

      itemRefs.current?.forEach((item) => {
        if (!item) return;

        if (animationClassName) {
          item.classList.remove(animationClassName);
        }

        const itemRect = item.getBoundingClientRect();
        const itemCenter =
          orientation === "horizontal"
            ? itemRect.left + defaultSize / 2
            : itemRect.top + defaultSize / 2;

        const distance = Math.abs(targetPos - itemCenter);
        const way = Math.min(distance / (defaultSize * DISTANCE_MULTIPLIER), 1);

        const percent = Math.max(
          0,
          1 - WAY_COEFFICIENT * way + WAY_QUADRATIC_COEFFICIENT * way * way
        );
        const scale = 1 + percent * (maxScale - 1);

        item.style.width = `${defaultSize * scale}px`;
        item.style.height = `${defaultSize * scale}px`;
      });
    },
    [containerRef, itemRefs, defaultSize, maxScale, orientation, animationClassName]
  );

  const handleMouseLeave = useCallback(() => {
    itemRefs.current?.forEach((item) => {
      if (!item) return;

      if (animationClassName) {
        item.classList.add(animationClassName);
      }

      item.style.width = `${defaultSize}px`;
      item.style.height = `${defaultSize}px`;
    });
  }, [itemRefs, defaultSize, animationClassName]);

  return {
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
}

