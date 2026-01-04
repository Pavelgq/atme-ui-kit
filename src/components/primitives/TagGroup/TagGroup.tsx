import React, { useState, useMemo } from "react";
import cn from "classnames";
import styles from "./TagGroup.module.pcss";
import { Tag, TagProps } from "../Tag";

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: React.ReactNode[];
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

    const handleExpand = () => {
      setIsExpanded(true);
    };

    const handleCollapse = () => {
      setIsExpanded(false);
    };

    const baseTagProps = {
      ...(size && { size }),
      ...(variant && { variant }),
    };

    return (
      <div ref={ref} className={cn(styles.tagGroup, className)} {...props}>
        {visibleTags.map((tag, index) => (
          <React.Fragment key={index}>
            {typeof tag === "object" && React.isValidElement(tag) ? (
              tag
            ) : (
              <Tag {...baseTagProps}>{tag}</Tag>
            )}
          </React.Fragment>
        ))}

        {!isExpanded && hiddenCount > 0 && (
          <Tag
            {...baseTagProps}
            {...overflowTagProps}
            onClick={handleExpand}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleExpand();
              }
            }}
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
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCollapse();
              }
            }}
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
