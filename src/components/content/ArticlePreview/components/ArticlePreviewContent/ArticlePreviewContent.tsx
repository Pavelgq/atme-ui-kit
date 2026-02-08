import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../primitives/Typography';
import styles from './ArticlePreviewContent.module.pcss';

export type ArticlePreviewContentView = 'tile' | 'row';

export interface ArticlePreviewContentProps {
  title: string;
  imageUrl?: string | undefined;
  imageAlt: string;
  formattedDate: string;
  view: ArticlePreviewContentView;
  tags?: React.ReactNode;
}

export function ArticlePreviewContent({
  title,
  imageUrl,
  imageAlt,
  formattedDate,
  view,
  tags,
}: ArticlePreviewContentProps) {
  return (
    <div className={cn(styles.content, styles[`content--${view}`])}>
      <div className={styles.previewWrap}>
        {tags && view === 'tile' && (
          <div className={styles.tagsSlotTile} onClick={(e) => e.stopPropagation()}>
            {tags}
          </div>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className={styles.previewImage}
            decoding="async"
            loading="lazy"
          />
        ) : (
          <div className={styles.previewPlaceholder} aria-hidden="true" />
        )}
      </div>
      <div className={styles.body}>
        {tags && view === 'row' && (
          <div className={styles.tagsSlotRow} onClick={(e) => e.stopPropagation()}>
            {tags}
          </div>
        )}
        <Typography variant="h5" as="h2" className={styles.title} title={title}>
          {title}
        </Typography>
        <Typography variant="caption" className={styles.date}>
          {formattedDate}
        </Typography>
      </div>
    </div>
  );
}

ArticlePreviewContent.displayName = 'ArticlePreviewContent';
