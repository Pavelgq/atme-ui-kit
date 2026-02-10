import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { AtmeRoot } from '@components/primitives/AtmeRoot';
import { BaseComponentProps } from '@components/types';
import { getCachedHtml, processMarkdown } from './markdownProcessor';
import styles from './Markdown.module.pcss';

export interface MarkdownProps extends BaseComponentProps {
  source: string;
  className?: string;
}

export const Markdown: React.FC<MarkdownProps> = ({
  source,
  className,
  testId,
}) => {
  const [html, setHtml] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    const trimmed = source.trim();
    if (!trimmed) {
      setHtml('');
      setLoading(false);
      return;
    }
    const cached = getCachedHtml(source);
    if (cached !== undefined) {
      setHtml(cached);
      setLoading(false);
      return;
    }
    setLoading(true);
    processMarkdown(source)
      .then((result) => {
        if (!cancelled) {
          setHtml(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (error) {
    return (
      <AtmeRoot
        className={cn(styles.root, styles.error, className)}
        testId={testId}
        role="alert"
      >
        Ошибка рендеринга Markdown: {error.message}
      </AtmeRoot>
    );
  }

  if (loading) {
    return (
      <AtmeRoot
        className={cn(styles.root, styles.loading, className)}
        testId={testId}
        aria-busy
      >
        <span className={styles.loadingText}>Загрузка…</span>
      </AtmeRoot>
    );
  }

  return (
    <AtmeRoot
      className={cn(styles.root, className)}
      testId={testId}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

Markdown.displayName = 'Markdown';
