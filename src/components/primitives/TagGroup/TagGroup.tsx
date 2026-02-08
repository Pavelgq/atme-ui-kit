import React, { useState, useMemo, useCallback } from "react";
import cn from "classnames";
import styles from "./TagGroup.module.pcss";
import { Tag, TagProps } from "../Tag";
import { TagGroupItemView } from "./components";
import type { TagGroupTag } from "./types";

export type { TagGroupItem, TagGroupTag } from "./types";
export { isTagGroupItem } from "./types";

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: TagGroupTag[];
  maxVisible?: number;
  overflowTagProps?: Omit<TagProps, "children">;
  collapseTagProps?: Omit<TagProps, "children">;
  collapseText?: string;
  size?: TagProps["size"];
  variant?: TagProps["variant"];
}

export const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      tags,
      maxVisible = 5,
      overflowTagProps,
      collapseTagProps,
      collapseText = "Свернуть",
      size,
      variant,
      className,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { visibleTags, hiddenCount } = useMemo(() => {
      if (tags.length <= maxVisible || isExpanded) {
        return {
          visibleTags: tags,
          hiddenCount: 0,
        };
      }

      return {
        visibleTags: tags.slice(0, maxVisible),
        hiddenCount: tags.length - maxVisible,
      };
    }, [tags, maxVisible, isExpanded]);

    const handleExpand = useCallback(() => setIsExpanded(true), []);
    const handleCollapse = useCallback(() => setIsExpanded(false), []);

    const handleExpandKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleExpand();
        }
      },
      [handleExpand]
    );

    const handleCollapseKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCollapse();
        }
      },
      [handleCollapse]
    );

    const baseTagProps = useMemo(
      () => ({
        ...(size && { size }),
        ...(variant && { variant }),
      }),
      [size, variant]
    );

    return (
      <div ref={ref} className={cn(styles.tagGroup, className)} {...props}>
        {visibleTags.map((tag, index) => (
          <TagGroupItemView key={index} tag={tag} baseTagProps={baseTagProps} />
        ))}

        {!isExpanded && hiddenCount > 0 && (
          <Tag
            {...baseTagProps}
            {...overflowTagProps}
            onClick={handleExpand}
            onKeyDown={handleExpandKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Показать еще ${hiddenCount} тегов`}
            style={{ cursor: "pointer", ...overflowTagProps?.style }}
          >
            +{hiddenCount}
          </Tag>
        )}

        {isExpanded && (
          <Tag
            {...baseTagProps}
            {...collapseTagProps}
            onClick={handleCollapse}
            onKeyDown={handleCollapseKeyDown}
            role="button"
            tabIndex={0}
            aria-label={collapseText}
            style={{ cursor: "pointer", ...collapseTagProps?.style }}
          >
            {collapseText}
          </Tag>
        )}
      </div>
    );
  }
);

TagGroup.displayName = "TagGroup";
