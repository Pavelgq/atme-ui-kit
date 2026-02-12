import { BaseComponentProps } from "@components/types";
import { forwardRef, ReactNode } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import styles from "./ActionButton.module.pcss";

export type ActionButtonVariant = "close" | "expand" | "default";

export interface ActionButtonProps
  extends
    BaseComponentProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ReactNode;
  hint?: string;
  variant?: ActionButtonVariant;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ onClick, icon, hint, className, testId, disabled, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        data-atme-ui
        className={cn(
          styles.button,
          variant !== "default" && styles[`button--${variant}`],
          className
        )}
        aria-label={hint}
        onClick={onClick}
        disabled={disabled}
        title={hint}
        {...(testId && { "data-testid": testId })}
        {...props}
      >
        <motion.span
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          initial={false}
          whileHover={disabled ? undefined : { rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {icon}
        </motion.span>
      </button>
    );
  }
);

ActionButton.displayName = "ActionButton";
