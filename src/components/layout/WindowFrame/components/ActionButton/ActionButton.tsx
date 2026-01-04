import { BaseComponentProps } from "@components/types";
import { forwardRef, ReactNode } from "react";
import cn from "classnames";
import styles from "./ActionButton.module.pcss";

export interface ActionButtonProps
  extends
    BaseComponentProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  hint?: string;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ onClick, icon, hint, className, testId, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(styles.button, className)}
        aria-label={hint}
        onClick={onClick}
        disabled={disabled}
        title={hint}
        {...(testId && { "data-testid": testId })}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

ActionButton.displayName = "ActionButton";
