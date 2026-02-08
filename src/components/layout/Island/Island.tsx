import { BaseComponentProps } from "@components/types";
import { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./Island.module.pcss";

export type IslandSize = "sm" | "md" | "lg";
export type IslandVariant = "default" | "paper" | "accent";
export type IslandElevation = "none" | "sm" | "md" | "lg" | "xl";

export interface IslandProps extends BaseComponentProps {
  children?: ReactNode;
  size?: IslandSize;
  variant?: IslandVariant;
  elevation?: IslandElevation;
  bordered?: boolean;
}

export const Island: FC<IslandProps> = ({
  children,
  className,
  testId,
  size = "md",
  variant = "paper",
  elevation = "none",
  bordered = false,
}) => {
  return (
    <div
      data-atme-ui
      className={cn(
        styles.island,
        styles[`island--size-${size}`],
        styles[`island--variant-${variant}`],
        styles[`island--elevation-${elevation}`],
        bordered && styles["island--bordered"],
        className
      )}
      {...(testId && { "data-testid": testId })}
    >
      {children}
    </div>
  );
};
