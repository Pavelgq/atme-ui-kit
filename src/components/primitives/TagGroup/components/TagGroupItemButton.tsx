import React, { useCallback } from "react";
import cn from "classnames";
import { Tag } from "../../Tag";
import type { TagGroupItem, TagGroupBaseTagProps } from "../types";
import styles from "../TagGroup.module.pcss";

const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

export interface TagGroupItemButtonProps {
  tag: TagGroupItem;
  baseTagProps: TagGroupBaseTagProps;
}

export function TagGroupItemButton({ tag, baseTagProps }: TagGroupItemButtonProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      stopPropagation(e);
      tag.onClick?.(e);
    },
    [tag.onClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tag.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
      }
    },
    [tag.onClick]
  );

  return (
    <Tag
      {...baseTagProps}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(styles.tagInteractive, baseTagProps?.className)}
    >
      {tag.label}
    </Tag>
  );
}
