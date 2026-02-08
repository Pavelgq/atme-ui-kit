import React, { useRef, useEffect, useState, useMemo } from "react";
import cn from "classnames";
import { BaseComponentProps } from "@components/types";
import { useMouseScale } from "@hooks/useMouseScale";
import { useMenuNavigation } from "@hooks/useMenuNavigation";
import { useRovingTabIndex } from "@hooks/useRovingTabIndex";
import { SideMenuItem } from "./SideMenuItem";
import styles from "./SideMenu.module.pcss";

export interface SideMenuItem {
  title: string;
  path: string;
  isOuterLink?: boolean;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export interface SideMenuProps extends BaseComponentProps {
  items: SideMenuItem[];
  defaultItemSize?: number;
  maxScale?: number;
  showTitles?: boolean;
  orientation?: "horizontal" | "vertical";
  onItemClick?: (item: SideMenuItem, index: number) => void;
  onNavigate?: (url: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  items,
  defaultItemSize = 80,
  maxScale = 1.5,
  showTitles = true,
  orientation = "horizontal",
  className,
  testId,
  onItemClick,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const linkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const [defaultWidth, setDefaultWidth] = useState(defaultItemSize);

  useEffect(() => {
    if (itemRefs.current[0]) {
      const width = itemRefs.current[0].getBoundingClientRect().width;
      setDefaultWidth(width || defaultItemSize);
    }
  }, [defaultItemSize]);

  const { handleMouseEnter, handleMouseMove, handleMouseLeave } = useMouseScale(
    {
      itemRefs: itemRefs as React.RefObject<(HTMLElement | null)[]>,
      containerRef: containerRef as React.RefObject<HTMLElement>,
      defaultSize: defaultWidth,
      maxScale,
      orientation,
      ...(styles.easeInAnimation && {
        animationClassName: styles.easeInAnimation,
      }),
    }
  );

  const { getTabIndex, focusItem } = useRovingTabIndex({
    itemsCount: items.length,
    initialFocusedIndex: 0,
  });

  const { handleNavigationKeyDown } = useMenuNavigation({
    itemsCount: items.length,
    orientation,
    onNavigate: (index) => {
      focusItem(index, linkRefs);
    },
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    // Обрабатываем навигацию стрелками
    const nextIndex = handleNavigationKeyDown(e, index);
    if (nextIndex !== null) {
      focusItem(nextIndex, linkRefs);
    }
    // Enter и Space обрабатываются в SideMenuItem
  };

  const menuRole = useMemo(
    () => (orientation === "horizontal" ? "menubar" : "menu"),
    [orientation]
  );

  return (
    <ul
      ref={containerRef}
      role={menuRole}
      data-atme-ui
      className={cn(
        styles.container,
        styles[`container--${orientation}`],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
      aria-orientation={orientation}
    >
      {items.map((item, index) => (
        <SideMenuItem
          key={`${item.path}-${index}`}
          item={item}
          index={index}
          size={defaultWidth}
          showTitles={showTitles}
          orientation={orientation}
          onItemClick={onItemClick}
          onNavigate={onNavigate}
          onKeyDown={handleKeyDown}
          tabIndex={getTabIndex(index)}
          itemRef={(el) => {
            itemRefs.current[index] = el;
          }}
          linkRef={(el) => {
            linkRefs.current[index] = el;
          }}
        />
      ))}
    </ul>
  );
};

SideMenu.displayName = "SideMenu";
