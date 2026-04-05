import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./DismissIcon.module.pcss";

export interface DismissIconProps extends React.SVGProps<SVGSVGElement> {
  decorative?: boolean;
}

export const DismissIcon = forwardRef<SVGSVGElement, DismissIconProps>(
  ({ decorative = true, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden={decorative}
      className={cn(styles.root, className)}
      {...props}
    >
      <line x1="1" y1="1" x2="9" y2="9" />
      <line x1="9" y1="1" x2="1" y2="9" />
    </svg>
  )
);

DismissIcon.displayName = "DismissIcon";
