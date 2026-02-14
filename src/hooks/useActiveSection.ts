import { useState, useEffect, useCallback, RefObject } from 'react';

export interface UseActiveSectionOptions {
  /** Контейнер со скроллом. Если не указан — используется window */
  root?: RefObject<Element | null>;
  /** Отступ от верха viewport (px), ниже которого секция считается «пройденной» и активной. По умолчанию 100 */
  offset?: number;
}

/**
 * Отслеживает, какая секция с заданным id видна при скролле.
 * Активная секция — последняя, чей верх уже «проскроллен» выше линии offset.
 * Логика вынесена из UI, чтобы компонент содержания оставался презентационным.
 *
 * @param sectionIds — массив id DOM-элементов (заголовков/секций статьи)
 * @param options — root (скролл-контейнер), offset (порог в пикселях)
 * @returns id активной секции или null, если ни одна не подошла
 */
export function useActiveSection(
  sectionIds: string[],
  options?: UseActiveSectionOptions
): string | null {
  const { root, offset = 100 } = options ?? {};
  const [activeId, setActiveId] = useState<string | null>(null);

  const updateActiveSection = useCallback(() => {
    if (sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    const container = root?.current ?? document;
    const threshold = offset;

    let lastPassed: string | null = null;

    for (const id of sectionIds) {
      const el =
        container === document
          ? document.getElementById(id)
          : container.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`);

      if (!el) continue;

      const rect = el.getBoundingClientRect();
      // Секция «пройдена», когда её верх выше порога (мы проскроллили её)
      if (rect.top <= threshold) {
        lastPassed = id;
      }
    }

    // Если ни одна не пройдена — активна первая (мы в начале страницы)
    setActiveId(lastPassed ?? sectionIds[0] ?? null);
  }, [sectionIds, root?.current, offset]);

  useEffect(() => {
    // Для window-scroll используем window, иначе — ref контейнера
    const scrollTarget = root?.current ?? (typeof window !== 'undefined' ? window : null);
    if (!scrollTarget) return;

    updateActiveSection();

    scrollTarget.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => scrollTarget.removeEventListener('scroll', updateActiveSection);
  }, [root, updateActiveSection]);

  return activeId;
}
