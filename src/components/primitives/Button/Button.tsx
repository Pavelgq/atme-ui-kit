import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Button.module.pcss";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      startIcon,
      endIcon,
      fullWidth = false,
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        data-atme-ui
        className={cn(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          startIcon && !loading && styles["button--hasStartIcon"],
          endIcon && !loading && styles["button--hasEndIcon"],
          fullWidth && styles["button--fullWidth"],
          loading && styles["button--loading"],
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className={styles.buttonSpinner} aria-hidden="true" />
        )}
        {startIcon && !loading && (
          <span className={styles.buttonIcon}>{startIcon}</span>
        )}
        <span className={styles.buttonContent}>{children}</span>
        {endIcon && !loading && (
          <span className={styles.buttonIcon}>{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
