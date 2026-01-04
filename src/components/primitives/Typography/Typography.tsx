import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Typography.module.pcss";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "caption"
  | "overline";
export type TypographySize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

export type TypographyColor = "primary" | "secondary" | "disabled";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  size?: TypographySize;
  color?: TypographyColor;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { variant = "body", size, color, as, children, className, ...props },
    ref
  ) => {
    const defaultElement = React.useMemo(() => {
      if (as) return as;
      if (variant.startsWith("h")) return variant;
      if (variant === "body") return "p";
      return "span";
    }, [as, variant]);

    const Component = defaultElement as React.ElementType;

    return (
      <Component
        ref={ref}
        className={cn(
          styles.typography,
          styles[`typography--${variant}`],
          size && styles[`typography--${size}`],
          color && styles[`typography--color-${color}`],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
