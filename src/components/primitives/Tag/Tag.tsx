import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "./Tag.module.pcss";

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

    const rootProps = href ? { ...props, href, as: "a" as const } : { ...props, as: "span" as const };
    const classNameComputed = cn(
      styles.tag,
      styles[`tag--${variant}`],
      styles[`tag--${size}`],
      href && styles["tag--link"],
      className
    );

    return (
      <TagRoot ref={ref} className={classNameComputed} {...rootProps}>
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
            ×
          </button>
        )}
      </TagRoot>
    );
  }
);

Tag.displayName = "Tag";
