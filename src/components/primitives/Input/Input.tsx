import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Input.module.pcss";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  error?: boolean;
  errorMessageId?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      startIcon,
      endIcon,
      fullWidth = false,
      error = false,
      errorMessageId,
      disabled,
      placeholder,
      type = "text",
      "aria-label": ariaLabel,
      "aria-invalid": ariaInvalid,
      "aria-required": ariaRequired,
      "aria-describedby": ariaDescribedby,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const describedBy = [ariaDescribedby, error && errorMessageId].filter(Boolean).join(" ") || undefined;

    return (
      <div
        data-atme-ui
        className={cn(
          styles.wrapper,
          styles[`wrapper--${size}`],
          fullWidth && styles["wrapper--fullWidth"],
          error && styles["wrapper--error"],
          disabled && styles["wrapper--disabled"]
        )}
      >
        {startIcon && (
          <span className={styles.iconStart} aria-hidden="true">
            {startIcon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(styles.input, className)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid ?? error}
          aria-required={ariaRequired}
          aria-describedby={describedBy}
          data-size={size}
          {...props}
        />
        {endIcon && (
          <span className={styles.iconEnd} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
