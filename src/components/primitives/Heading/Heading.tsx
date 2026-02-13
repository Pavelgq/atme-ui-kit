import React, { forwardRef } from "react";
import cn from "classnames";
import { Typography } from "../Typography";
import type { TypographyVariant, TypographySize, TypographyColor } from "../Typography";
import { HashIcon } from "../Icon/Icons";
import styles from "./Heading.module.pcss";

export type HeadingVariant = TypographyVariant;
export type HeadingSize = TypographySize;
export type HeadingColor = TypographyColor;

export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  variant?: HeadingVariant;
  size?: HeadingSize;
  color?: HeadingColor;
  anchorId?: string;
  children: React.ReactNode;
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  (
    {
      variant = "h2",
      size,
      color,
      anchorId,
      children,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const headingId = id ?? anchorId;
    const hasAnchor = Boolean(anchorId);

    const typography = (
      <Typography variant={variant} size={size} color={color} as="span">
        {children}
      </Typography>
    );

    if (hasAnchor) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={`#${anchorId}`}
          id={headingId}
          data-atme-ui
          data-heading-anchor
          className={cn(styles.heading, styles.headingAnchor, className)}
          aria-label={`Ссылка на раздел: ${typeof children === "string" ? children : anchorId}`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className={styles.headingText}>{typography}</span>
          <span className={styles.hashIcon} data-hash-icon-wrapper aria-hidden>
            <HashIcon decorative />
          </span>
        </a>
      );
    }

    const defaultElement = variant.startsWith("h") ? variant : "h2";
    const Component = defaultElement as React.ElementType;

    return (
      <Component
        ref={ref as React.Ref<HTMLHeadingElement>}
        id={headingId}
        data-atme-ui
        className={cn(styles.heading, className)}
        {...(props as React.HTMLAttributes<HTMLHeadingElement>)}
      >
        {typography}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
