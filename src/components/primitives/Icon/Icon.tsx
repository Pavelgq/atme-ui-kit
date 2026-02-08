import React, { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Icon.module.pcss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  children?: React.ReactNode;
  svg?: string;
  name?: string;
  decorative?: boolean;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      color = 'currentColor',
      children,
      svg,
      name,
      decorative = false,
      className,
      viewBox = '0 0 24 24',
      fill = 'none',
      xmlns = 'http://www.w3.org/2000/svg',
      ...props
    },
    ref
  ) => {
    if (svg) {
      const svgContent = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

      return (
        <svg
          ref={ref}
          data-atme-ui
          className={cn(styles.icon, styles['icon--custom'], className)}
          viewBox={viewBox}
          xmlns={xmlns}
          aria-hidden={decorative}
          aria-label={!decorative && name ? name : undefined}
          role={!decorative ? 'img' : undefined}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          {...props}
        />
      );
    }

    return (
      <svg
        ref={ref}
        data-atme-ui
        className={cn(styles.icon, className)}
        viewBox={viewBox}
        fill={fill}
        xmlns={xmlns}
        color={color}
        aria-hidden={decorative}
        aria-label={!decorative && name ? name : undefined}
        role={!decorative ? 'img' : undefined}
        {...props}
      >
        {children}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

