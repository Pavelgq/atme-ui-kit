import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../primitives/Typography';
import { EyeIcon, FileTextIcon } from '../../../../primitives/Icon/Icons';
import styles from './ArticlePreviewContent.module.pcss';

export type ArticlePreviewContentView = 'tile' | 'row' | 'file';

export interface ArticlePreviewContentProps {
  title: string;
  description?: string;
  viewsCount?: number;
  imageUrl?: string | undefined;
  imageAlt: string;
  formattedDate: string;
  view: ArticlePreviewContentView;
  tags?: React.ReactNode;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

export function ArticlePreviewContent({
  title,
  description,
  viewsCount,
  imageUrl,
  imageAlt,
  formattedDate,
  view,
  tags,
}: ArticlePreviewContentProps) {
  if (view === 'file') {
    return (
      <div className={cn(styles.content, styles['content--file'])}>
        <div className={styles.fileIcon} aria-hidden>
          <FileTextIcon size={24} strokeWidth={2} />
        </div>
        <div className={styles.fileBody}>
          {tags && (
            <div className={styles.tagsSlotFile} onClick={(e) => e.stopPropagation()}>
              {tags}
            </div>
          )}
          <Typography variant="h5" as="h2" className={styles.title} title={title}>
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" className={styles.description}>
              {description}
            </Typography>
          )}
          <div className={styles.fileMeta}>
            <Typography variant="caption" className={styles.date}>
              {formattedDate}
            </Typography>
            {viewsCount != null && (
              <span className={styles.views} title="Просмотры">
                <EyeIcon size={14} strokeWidth={2} />
                <span>{formatViews(viewsCount)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        {description && (view === 'tile' || view === 'row') && (
          <Typography variant="caption" className={styles.description}>
            {description}
          </Typography>
        )}
        <div className={styles.meta}>
          <Typography variant="caption" className={styles.date}>
            {formattedDate}
          </Typography>
          {viewsCount != null && (
            <span className={styles.views} title="Просмотры">
              <EyeIcon size={14} strokeWidth={2} />
              <span>{formatViews(viewsCount)}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

ArticlePreviewContent.displayName = 'ArticlePreviewContent';
