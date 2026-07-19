import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import styles from './TagGroup.module.pcss';
import { Tag, type TagProps } from '../Tag';
import { ChevronUpIcon } from '../Icon/Icons';
import { TagGroupItemView } from './components';
import type { TagGroupTag } from './types';

export type { TagGroupItem, TagGroupTag } from './types';
// eslint-disable-next-line react-refresh/only-export-components -- намеренно: type guard живёт рядом со своим компонентом
export { isTagGroupItem } from './types';

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: TagGroupTag[];
  maxVisible?: number;
  tagProps?: Omit<TagProps, 'children'>;
  overflowTagProps?: Omit<TagProps, 'children'>;
  collapseTagProps?: Omit<TagProps, 'children'>;
  collapseText?: string;
  size?: TagProps['size'];
  variant?: TagProps['variant'];
}

export const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(
  (
    {
      tags,
      maxVisible = 5,
      tagProps,
      overflowTagProps,
      collapseTagProps,
      collapseText = 'Свернуть',
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
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExpand();
        }
      },
      [handleExpand]
    );

    const handleCollapseKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCollapse();
        }
      },
      [handleCollapse]
    );

    const baseTagProps = useMemo(
      () => ({
        ...tagProps,
        ...(size && { size }),
        ...(variant && { variant }),
      }),
      [tagProps, size, variant]
    );

    return (
      <div ref={ref} data-atme-ui className={cn(styles.tagGroup, className)} {...props}>
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
            className={cn(styles.tagInteractive, overflowTagProps?.className)}
            style={overflowTagProps?.style}
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
            className={cn(styles.tagInteractive, collapseTagProps?.className)}
            style={collapseTagProps?.style}
          >
            <ChevronUpIcon decorative width={16} height={16} />
          </Tag>
        )}
      </div>
    );
  }
);

TagGroup.displayName = 'TagGroup';
