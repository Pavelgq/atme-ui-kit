import React, { forwardRef, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { BaseComponentProps } from '@components/types';
import { formatDateRu } from '@utils/date/formatDate';
import { ArticlePreviewContent } from './components/ArticlePreviewContent';
import styles from './ArticlePreview.module.pcss';

export type ArticlePreviewView = 'card' | 'row';

export interface ArticlePreviewAuthor {
  /** URL аватара автора */
  avatarUrl?: string;
  /** Имя автора (например, «Иван Иванов») */
  name: string;
}

export interface ArticlePreviewProps
  extends BaseComponentProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  publishedAt: Date | string;
  formattedDate?: string;
  /** Краткое описание статьи */
  description?: string;
  /** Количество просмотров */
  viewsCount?: number;
  /** Время чтения в минутах */
  readingTimeMinutes?: number;
  /** Автор (опционально). Если не указан — блок автора не отображается */
  author?: ArticlePreviewAuthor;
  imageUrl?: string;
  view?: ArticlePreviewView;
  imageAlt?: string;
  href?: string;
  tags?: React.ReactNode;
}

export const ArticlePreview = forwardRef<HTMLDivElement | HTMLAnchorElement, ArticlePreviewProps>(
  (
    {
      title,
      publishedAt,
      formattedDate: formattedDateProp,
      description,
      viewsCount,
      readingTimeMinutes,
      author,
      imageUrl,
      view = 'card',
      imageAlt = '',
      href,
      tags,
      className,
      testId,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const formattedDate = useMemo(
      () => formattedDateProp ?? formatDateRu(publishedAt),
      [formattedDateProp, publishedAt]
    );

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
      if (!href && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      (onKeyDown as React.KeyboardEventHandler<HTMLElement>)?.(e);
    },[]);

    const isInteractive = Boolean(href || onClick);
    const sharedClassName = cn(
      styles.root,
      styles[`root--${view}`],
      isInteractive && styles['root--interactive'],
      className
    );
    const content = (
      <ArticlePreviewContent
        title={title}
        description={description}
        viewsCount={viewsCount}
        readingTimeMinutes={readingTimeMinutes}
        author={author}
        {...(imageUrl != null
          ? { imageUrl, imageAlt: imageAlt || title }
          : {})}
        formattedDate={formattedDate}
        view={view}
        tags={tags}
      />
    );

    const wrapperProps = {
      className: sharedClassName,
      onClick,
      onKeyDown: isInteractive ? handleKeyDown : onKeyDown,
      'data-atme-ui': true,
      'data-testid': testId,
      ...(href
        ? { href }
        : { role: isInteractive ? 'button' : undefined, tabIndex: isInteractive ? 0 : undefined }),
      ...props,
    };

    return href ? (
      <a ref={ref as React.Ref<HTMLAnchorElement>} {...wrapperProps}>
        {content}
      </a>
    ) : (
      <div ref={ref as React.Ref<HTMLDivElement>} {...wrapperProps}>
        {content}
      </div>
    );
  }
);

ArticlePreview.displayName = 'ArticlePreview';
