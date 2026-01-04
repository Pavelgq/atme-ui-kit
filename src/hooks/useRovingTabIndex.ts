import { useState, useCallback, RefObject } from "react";

export interface UseRovingTabIndexOptions {
  itemsCount: number;
  initialFocusedIndex?: number;
}

export interface UseRovingTabIndexReturn {
  focusedIndex: number | null;
  setFocusedIndex: (index: number) => void;
  getTabIndex: (index: number) => number;
  focusItem: (
    index: number,
    refs: RefObject<(HTMLElement | null)[]>
  ) => void;
}

/**
 * Хук для управления roving tabindex паттерном.
 * Обеспечивает, что только один элемент в меню имеет tabIndex={0},
 * остальные имеют tabIndex={-1}.
 *
 * @param options - Опции для настройки roving tabindex
 * @returns Утилиты для управления фокусом
 */
export function useRovingTabIndex({
  initialFocusedIndex = 0,
}: UseRovingTabIndexOptions): UseRovingTabIndexReturn {
  const [focusedIndex, setFocusedIndexState] = useState<number | null>(
    initialFocusedIndex
  );

  const setFocusedIndex = useCallback((index: number) => {
    setFocusedIndexState(index);
  }, []);

  const getTabIndex = useCallback(
    (index: number): number => {
      return focusedIndex === index ||
        (focusedIndex === null && index === initialFocusedIndex)
        ? 0
        : -1;
    },
    [focusedIndex, initialFocusedIndex]
  );

  const focusItem = useCallback(
    (index: number, refs: RefObject<(HTMLElement | null)[]>) => {
      setFocusedIndex(index);
      refs.current?.[index]?.focus();
    },
    [setFocusedIndex]
  );

  return {
    focusedIndex,
    setFocusedIndex,
    getTabIndex,
    focusItem,
  };
}

