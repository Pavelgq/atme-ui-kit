import { useCallback } from "react";

export interface UseMenuNavigationOptions {
  itemsCount: number;
  orientation: "horizontal" | "vertical";
  onNavigate?: (index: number) => void;
}

export interface UseMenuNavigationReturn {
  handleNavigationKeyDown: (
    e: React.KeyboardEvent,
    currentIndex: number
  ) => number | null;
}

/**
 * Хук для обработки навигации по меню с помощью клавиатуры.
 * Поддерживает стрелки, Home, End с циклической навигацией.
 *
 * @param options - Опции для настройки навигации
 * @returns Обработчик навигации по клавиатуре
 */
export function useMenuNavigation({
  itemsCount,
  orientation,
  onNavigate,
}: UseMenuNavigationOptions): UseMenuNavigationReturn {
  const handleNavigationKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number): number | null => {
      const isHorizontal = orientation === "horizontal";
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = currentIndex < itemsCount - 1 ? currentIndex + 1 : 0;
          }
          break;
        case "ArrowLeft":
          if (isHorizontal) {
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : itemsCount - 1;
          }
          break;
        case "ArrowDown":
          if (!isHorizontal) {
            e.preventDefault();
            nextIndex = currentIndex < itemsCount - 1 ? currentIndex + 1 : 0;
          }
          break;
        case "ArrowUp":
          if (!isHorizontal) {
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : itemsCount - 1;
          }
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = itemsCount - 1;
          break;
        default:
          return null;
      }

      if (nextIndex !== null && onNavigate) {
        onNavigate(nextIndex);
      }

      return nextIndex;
    },
    [itemsCount, orientation, onNavigate]
  );

  return {
    handleNavigationKeyDown,
  };
}

