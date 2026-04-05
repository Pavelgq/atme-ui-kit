import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Tag.module.pcss";
import { DismissIcon } from "../Icon/Icons/custom/DismissIcon/DismissIcon";
import { HashIcon } from "../Icon/Icons/custom/HashIcon/HashIcon";

export type TagVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";
export type TagSize = "sm" | "md" | "lg";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  closeable?: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hashtag?: boolean;
  children: React.ReactNode;
  href?: string;
}

type TagRootElement = HTMLAnchorElement | HTMLSpanElement;

const TagRoot = forwardRef<
  TagRootElement,
  (
    | (React.ComponentPropsWithoutRef<"a"> & { as: "a" })
    | (React.ComponentPropsWithoutRef<"span"> & { as: "span" })
  ) & { as: "a" | "span" }
>(function TagRoot({ as: Component, ...props }, ref) {
  return React.createElement(Component, { ...props, ref });
});

export const Tag = forwardRef<TagRootElement, TagProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      closeable = false,
      onClose,
      hashtag = false,
      children,
      className,
      href,
      ...props
    },
    ref
  ) => {
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClose?.(event);
    };

    const rootProps = href
      ? { ...props, href, as: "a" as const, "data-atme-ui": true }
      : { ...props, as: "span" as const, "data-atme-ui": true };
    const hasLeadingIcon = hashtag || (!!icon && iconPosition === "left");
    const hasTrailingIcon = closeable || (!!icon && iconPosition === "right");

    const classNameComputed = cn(
      styles.tag,
      styles[`tag--${variant}`],
      styles[`tag--${size}`],
      href && styles["tag--link"],
      hasLeadingIcon && styles["tag--hasLeadingIcon"],
      hasTrailingIcon && styles["tag--hasTrailingIcon"],
      className
    );

    return (
      <TagRoot ref={ref} className={classNameComputed} {...rootProps}>
        {hashtag && (
          <span className={styles.tagHashIcon}>
            <HashIcon width="0.85em" height="0.85em" />
          </span>
        )}
        {icon && iconPosition === "left" && (
          <span className={styles.tagIcon}>{icon}</span>
        )}
        <span className={styles.tagContent}>{children}</span>
        {icon && iconPosition === "right" && (
          <span className={styles.tagIcon}>{icon}</span>
        )}
        {closeable && (
          <button
            type="button"
            className={styles.tagClose}
            onClick={handleClose}
            aria-label="Close tag"
          >
            <DismissIcon width="0.7em" height="0.7em" />
          </button>
        )}
      </TagRoot>
    );
  }
);

Tag.displayName = "Tag";
