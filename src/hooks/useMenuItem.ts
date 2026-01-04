import { useCallback } from "react";
import { openExternalLink } from "@utils/navigation";
import type { SideMenuItem as SideMenuItemType } from "@components/navigation/SideMenu/SideMenu";

export interface UseMenuItemOptions {
  item: SideMenuItemType;
  index: number;
  onItemClick?: ((item: SideMenuItemType, index: number) => void) | undefined;
  onNavigate?: ((url: string) => void) | undefined;
}

export interface UseMenuItemReturn {
  elementType: "button" | "a";
  handleClick: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  handleActivate: () => void;
  linkProps: {
    href?: string;
    target?: string;
    rel?: string;
  };
}

/**
 * Хук для определения логики элемента меню.
 * Определяет тип элемента (button или a) и обрабатывает активацию.
 *
 * @param options - Опции для настройки элемента меню
 * @returns Логика для элемента меню
 */
export function useMenuItem({
  item,
  index,
  onItemClick,
  onNavigate,
}: UseMenuItemOptions): UseMenuItemReturn {
  const isOuterLink = item.isOuterLink !== false;
  const isInteractive = item.isOuterLink === false || onItemClick;
  const elementType: "button" | "a" = isInteractive ? "button" : "a";

  const handleActivate = useCallback(() => {
    if (onItemClick) {
      onItemClick(item, index);
    } else if (isOuterLink) {
      if (onNavigate) {
        onNavigate(item.path);
      } else {
        openExternalLink(item.path);
      }
    }
  }, [item, index, onItemClick, onNavigate, isOuterLink]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (isInteractive) {
        e.preventDefault();
        handleActivate();
      }
      // Для внешних ссылок (<a>) не предотвращаем стандартное поведение
    },
    [isInteractive, handleActivate]
  );

  const linkProps = isOuterLink && !isInteractive
    ? {
        href: item.path,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return {
    elementType,
    handleClick,
    handleActivate,
    linkProps,
  };
}

