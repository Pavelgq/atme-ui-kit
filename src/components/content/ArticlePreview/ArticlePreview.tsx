import React, { forwardRef, useMemo } from 'react';
import cn from 'classnames';
import { BaseComponentProps } from '@components/types';
import { ArticlePreviewContent } from './components/ArticlePreviewContent';
import styles from './ArticlePreview.module.pcss';

export type ArticlePreviewView = 'tile' | 'row';

export interface ArticlePreviewProps
  extends BaseComponentProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement> & React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string;
  publishedAt: Date | string;
  imageUrl?: string;
  view?: ArticlePreviewView;
  imageAlt?: string;
  href?: string;
}

function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const ArticlePreview = forwardRef<HTMLDivElement | HTMLAnchorElement, ArticlePreviewProps>(
  (
    {
      title,
      publishedAt,
      imageUrl,
      view = 'tile',
      imageAlt = '',
      href,
      className,
      testId,
      onClick,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const formattedDate = useMemo(() => formatDate(publishedAt), [publishedAt]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
      if (!href && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      (onKeyDown as React.KeyboardEventHandler<HTMLElement>)?.(e);
    };

    const isInteractive = Boolean(href || onClick);
    const sharedClassName = cn(
      styles.root,
      styles[`root--${view}`],
      isInteractive && styles['root--interactive'],
      className
    );
    const sharedProps = {
      className: sharedClassName,
      onClick,
      onKeyDown: isInteractive ? handleKeyDown : onKeyDown,
      'data-testid': testId,
      ...props,
    };

    if (href) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...sharedProps}>
          <ArticlePreviewContent
            title={title}
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            formattedDate={formattedDate}
            view={view}
          />
        </a>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        {...sharedProps}
      >
        <ArticlePreviewContent
          title={title}
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          formattedDate={formattedDate}
          view={view}
        />
      </div>
    );
  }
);

ArticlePreview.displayName = 'ArticlePreview';
