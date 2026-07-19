import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Root } from '../Root';
import { LinkIcon } from '../Icon/Icons';
import { type BaseComponentProps } from '@components/types';
import styles from './Link.module.pcss';

export interface LinkProps
  extends BaseComponentProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  children: React.ReactNode;
  showIcon?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, showIcon = true, className, testId, ...props }, ref) => (
    <Root
      ref={ref as React.Ref<HTMLAnchorElement>}
      as="a"
      testId={testId}
      data-link
      className={cn(styles.link, className)}
      {...props}
    >
      <span className={styles.linkText}>{children}</span>
      {showIcon && (
        <span className={styles.linkIcon} aria-hidden>
          <LinkIcon decorative />
        </span>
      )}
    </Root>
  )
);

Link.displayName = 'Link';
