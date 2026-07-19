import React from 'react';
import cn from 'classnames';
import { Root } from '../Root';
import { type BaseComponentProps } from '@components/types';
import styles from './Card.module.pcss';

export type CardSize = 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'paper' | 'accent';
export type CardElevation = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: CardSize;
  variant?: CardVariant;
  elevation?: CardElevation;
  bordered?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  as = 'section',
  size = 'md',
  variant = 'paper',
  elevation = 'none',
  bordered = true,
  className,
  testId,
  children,
  ...props
}) => {
  return (
    <Root
      as={as}
      className={cn(
        styles.card,
        styles[`card--size-${size}`],
        styles[`card--variant-${variant}`],
        styles[`card--elevation-${elevation}`],
        bordered && styles['card--bordered'],
        className
      )}
      testId={testId}
      {...props}
    >
      {children}
    </Root>
  );
};

Card.displayName = 'Card';
