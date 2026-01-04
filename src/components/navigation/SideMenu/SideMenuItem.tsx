import React, { forwardRef } from "react";
import { Typography } from "../../primitives/Typography";
import { useMenuItem } from "@hooks/useMenuItem";
import type { SideMenuItem as SideMenuItemType } from "./SideMenu";
import styles from "./SideMenu.module.pcss";

export interface SideMenuItemProps {
  item: SideMenuItemType;
  index: number;
  size: number;
  showTitles: boolean;
  orientation: "horizontal" | "vertical";
  onItemClick?: (item: SideMenuItemType, index: number) => void;
  onNavigate?: (url: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>, index: number) => void;
  tabIndex: number;
  itemRef?: (el: HTMLLIElement | null) => void;
  linkRef?: (el: HTMLAnchorElement | HTMLButtonElement | null) => void;
}

export const SideMenuItem = forwardRef<HTMLLIElement, SideMenuItemProps>(
  (
    {
      item,
      index,
      size,
      showTitles,
      onItemClick,
      onNavigate,
      onKeyDown,
      tabIndex,
      itemRef,
      linkRef,
    },
    ref
  ) => {
    const { elementType, handleClick, handleActivate, linkProps } = useMenuItem(
      {
        item,
        index,
        onItemClick,
        onNavigate,
      }
    );

    const ItemIcon = item.Icon;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleActivate();
      } else if (onKeyDown) {
        onKeyDown(e, index);
      }
    };

    const commonProps = {
      ref: linkRef,
      className: styles.link,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      "aria-label": item.title,
      role: "menuitem" as const,
      tabIndex,
    };

    return (
      <li
        ref={(el) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(el);
            } else {
              ref.current = el;
            }
          }
          itemRef?.(el);
        }}
        role="none"
        className={styles.item}
        style={{ width: size, height: size }}
      >
        {elementType === "button" ? (
          <button type="button" {...commonProps}>
            <ItemIcon className={styles.icon} width="100%" height="100%" />
            {showTitles && (
              <Typography as="span" variant="body" className={styles.title}>
                {item.title}
              </Typography>
            )}
          </button>
        ) : (
          <a {...commonProps} {...linkProps}>
            <ItemIcon className={styles.icon} width="100%" height="100%" />
            {showTitles && (
              <Typography as="span" variant="body" className={styles.title}>
                {item.title}
              </Typography>
            )}
          </a>
        )}
      </li>
    );
  }
);

SideMenuItem.displayName = "SideMenuItem";
