import React, { forwardRef, useEffect, useRef } from "react";
import cn from "classnames";
import { Root } from "../Root";
import { BaseComponentProps } from "@components/types";
import styles from "./SelectableControl.module.pcss";

export type SelectableControlType = "checkbox" | "radio";
export type SelectableControlSize = "sm" | "md" | "lg";

export interface SelectableControlProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  type?: SelectableControlType;
  size?: SelectableControlSize;
  description?: React.ReactNode;
  indeterminate?: boolean;
  children?: React.ReactNode;
}

export const SelectableControl = forwardRef<HTMLInputElement, SelectableControlProps>(
  (
    {
      type = "checkbox",
      size = "md",
      description,
      indeterminate = false,
      className,
      testId,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (type === "checkbox" && inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, type]);

    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    return (
      <Root
        as="label"
        testId={testId}
        className={cn(
          styles.root,
          styles[`root--${size}`],
          disabled && styles["root--disabled"],
          className
        )}
      >
        <input ref={setRefs} type={type} className={styles.input} disabled={disabled} {...props} />
        <span
          className={cn(styles.control, styles[`control--${type}`], styles[`control--${size}`])}
          aria-hidden="true"
        />
        {(children || description) && (
          <span className={styles.content}>
            {children && <span className={styles.label}>{children}</span>}
            {description && <span className={styles.description}>{description}</span>}
          </span>
        )}
      </Root>
    );
  }
);

SelectableControl.displayName = "SelectableControl";
