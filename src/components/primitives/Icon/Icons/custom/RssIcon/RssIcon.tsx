import React, { forwardRef } from 'react';
import cn from 'classnames';
import styles from './RssIcon.module.pcss';

export interface RssIconProps extends React.SVGProps<SVGSVGElement> {
  decorative?: boolean;
}

export const RssIcon = forwardRef<SVGSVGElement, RssIconProps>(
  ({ decorative = true, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative}
      className={cn(styles.root, className)}
      {...props}
    >
      <circle data-rss-dot cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
      <path data-rss-wave="inner" d="M4 11a9 9 0 0 1 9 9" />
      <path data-rss-wave="outer" d="M4 4a16 16 0 0 1 16 16" />
    </svg>
  )
);

RssIcon.displayName = 'RssIcon';
