import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Badge.module.pcss";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Только точка, без текста (для индикатора статуса) */
  dot?: boolean;
  /** Максимальное число для отображения; при превышении показывается "max+" */
  max?: number;
  children?: React.ReactNode;
}

function formatCount(value: React.ReactNode, max?: number): React.ReactNode {
  if (max != null && typeof value === "number" && value > max) {
    return `${max}+`;
  }
  return value;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "primary",
      size = "md",
      dot = false,
      max,
      children,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const content = dot ? null : formatCount(children, max);
    const label =
      ariaLabel ??
      (typeof children === "number" && !dot
        ? `${children} items`
        : undefined);

    return (
      <span
        ref={ref}
        className={cn(
          styles.badge,
          styles[`badge--${variant}`],
          styles[`badge--${size}`],
          dot && styles["badge--dot"],
          className
        )}
        role={dot ? "status" : undefined}
        aria-label={label}
        aria-hidden={dot && !label ? true : undefined}
        {...props}
      >
        {dot && <span className={styles.badgeDot} aria-hidden="true" />}
        {!dot && content != null && (
          <span className={styles.badgeContent}>{content}</span>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";
