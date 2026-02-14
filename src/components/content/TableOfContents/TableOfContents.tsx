import { forwardRef } from 'react';
import cn from 'classnames';
import { Root } from '@components/primitives/Root';
import { Typography } from '@components/primitives/Typography';
import { BaseComponentProps } from '@components/types';
import styles from './TableOfContents.module.pcss';

export interface TableOfContentsItem {
  id: string;
  href: string;
  label: string;
}

export interface TableOfContentsProps extends BaseComponentProps {
  items: TableOfContentsItem[];
  activeId?: string | null;
  title?: string;
}

export const TableOfContents = forwardRef<HTMLElement, TableOfContentsProps>(
  ({ items, activeId, title = 'Содержание', className, testId }, ref) => {
    if (items.length === 0) return null;

    return (
      <Root
        ref={ref}
        as="nav"
        className={cn(styles.root, className)}
        testId={testId}
        aria-label={title}
      >
        {title && 
          <Typography
            variant="overline"
            size="sm"
            as="h2"
            className={styles.title}
          >
            {title}
          </Typography>
        }
        <ol className={styles.list} role="list">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={styles.item}>
                <a
                  href={item.href}
                  className={cn(styles.link, isActive && styles['link--active'])}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <Typography
                    variant="body"
                    size="sm"
                    color={isActive ? 'primary' : 'secondary'}
                    as="span"
                    className={styles.linkText}
                  >
                    {item.label}
                  </Typography>
                </a>
              </li>
            );
          })}
        </ol>
      </Root>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';
