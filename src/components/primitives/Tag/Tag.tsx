import React, { forwardRef } from 'react';
import styles from './Tag.module.pcss';

export type TagVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  closeable?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      closeable = false,
      onClose,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.(event);
    };

    const classNames = [styles.tag, styles[`tag--${variant}`], styles[`tag--${size}`], className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classNames} {...props}>
        {icon && iconPosition === 'left' && <span className={styles.tagIcon}>{icon}</span>}
        <span className={styles.tagContent}>{children}</span>
        {icon && iconPosition === 'right' && <span className={styles.tagIcon}>{icon}</span>}
        {closeable && (
          <button
            type="button"
            className={styles.tagClose}
            onClick={handleClose}
            aria-label="Close tag"
          >
            ×
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

