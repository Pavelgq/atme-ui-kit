import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../primitives/Typography';
import { EyeIcon, FileTextIcon } from '../../../../primitives/Icon/Icons';
import { AnimatedEyeIcon } from './AnimatedEyeIcon';
import type { ArticlePreviewAuthor } from '../../ArticlePreview';
import { AnimatedClockIcon } from './AnimatedClockIcon';
import styles from './ArticlePreviewContent.module.pcss';

export type ArticlePreviewContentView = 'card' | 'row';

export interface ArticlePreviewContentProps {
  title: string;
  description?: string;
  viewsCount?: number;
  readingTimeMinutes?: number;
  author?: ArticlePreviewAuthor;
  imageUrl?: string;
  imageAlt?: string;
  formattedDate: string;
  view: ArticlePreviewContentView;
  tags?: React.ReactNode;
  href?: string;
  /** Показывать ли заглушку если imageUrl не передан. По умолчанию true */
  showPlaceholder?: boolean;
  className?: string;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

function formatReadingTime(minutes: number): string {
  if (minutes < 60) return `${minutes} мин`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} ч ${m} мин` : `${h} ч`;
}

export function ArticlePreviewContent({
  title,
  description,
  viewsCount,
  readingTimeMinutes,
  author,
  imageUrl,
  imageAlt,
  formattedDate,
  view,
  tags,
  href,
  showPlaceholder = true,
  className,
}: ArticlePreviewContentProps) {
  if (view === 'row') {
    return (
      <div className={cn(styles.content, styles['content--row'], className)}>
        <div className={styles.rowIcon} aria-hidden>
          <FileTextIcon size={24} strokeWidth={2} />
        </div>
        <div className={styles.rowBody}>
          {tags && (
            <div className={styles.tagsSlotRow} onClick={(e) => e.stopPropagation()}>
              {tags}
            </div>
          )}
          <Typography variant="h5" as="h2" className={styles.title} title={title}>
            {title}
          </Typography>
          <div className={styles.rowMeta}>
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

  if (view === 'card') {
    const metaItems = (
      <>
        {readingTimeMinutes != null && (
          <span className={styles.readingTime} title="Время чтения">
            <AnimatedClockIcon size={14} className={styles.clockIcon} />
            <span>{formatReadingTime(readingTimeMinutes)}</span>
          </span>
        )}
        {viewsCount != null && (
          <span className={styles.views} title="Просмотры">
            <AnimatedEyeIcon size={14} className={styles.eyeIcon} />
            <span>{formatViews(viewsCount)}</span>
          </span>
        )}
      </>
    );

    return (
      <div
        className={cn(
          styles.content,
          styles['content--card'],
          className
        )}
      >
        <div className={styles.cardBody}>
          {author ? (
            <div className={styles.author} onClick={(e) => e.stopPropagation()}>
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt=""
                  className={styles.authorAvatar}
                  width={32}
                  height={32}
                />
              ) : (
                <div className={styles.authorAvatarPlaceholder} aria-hidden>
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <Typography variant="caption" className={styles.authorName}>
                {author.name}
              </Typography>
              <Typography variant="caption" className={styles.date}>
                {formattedDate}
              </Typography>
            </div>
          ) : (
            <Typography variant="caption" className={styles.date}>
              {formattedDate}
            </Typography>
          )}
          <Typography variant="h5" as="h2" className={styles.title} title={title}>
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" className={styles.description}>
              {description}
            </Typography>
          )}
          <div className={styles.cardFooter}>
            {tags && (
              <div className={styles.tagsSlotCard} onClick={(e) => e.stopPropagation()}>
                {tags}
              </div>
            )}
            {href ? (
              <a href={href} className={styles.meta}>{metaItems}</a>
            ) : (
              <div className={styles.meta}>{metaItems}</div>
            )}
          </div>
        </div>
        {imageUrl ? (
          <div className={styles.previewWrap}>
            <img
              src={imageUrl}
              alt={imageAlt || title}
              className={styles.previewImage}
              decoding="async"
              loading="lazy"
            />
          </div>
        ) : showPlaceholder ? (
          <div className={styles.previewWrap}>
            <div className={styles.previewPlaceholder} aria-hidden />
          </div>
        ) : null}
      </div>
    );
  }

  return null;
}

ArticlePreviewContent.displayName = 'ArticlePreviewContent';
