import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./HashIcon.module.pcss";

export interface HashIconProps extends React.SVGProps<SVGSVGElement> {
  decorative?: boolean;
}

export const HashIcon = forwardRef<SVGSVGElement, HashIconProps>(
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
      <line data-hash-stick="top" x1="4" x2="20" y1="9" y2="9" />
      <line data-hash-stick="bottom" x1="4" x2="20" y1="15" y2="15" />
      <line data-hash-stick="left" x1="10" x2="8" y1="3" y2="21" />
      <line data-hash-stick="right" x1="16" x2="14" y1="3" y2="21" />
    </svg>
  )
);

HashIcon.displayName = "HashIcon";
