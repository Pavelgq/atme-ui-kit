import React, { forwardRef } from "react";
import cn from "classnames";
import { getSpacingVar } from "@tokens/utils";
import styles from "./Grid.module.pcss";
import type { BaseComponentProps } from "../../types";

export type GridGap = number | string;

export type GridColumns =
  | number
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      "2xl"?: number;
    };

type GridElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "aside"
  | "nav";

export interface GridProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "ref"> {
  columns?: GridColumns;
  gap?: GridGap;
  minColumnWidth?: string;
  as?: GridElement;
  children: React.ReactNode;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 12,
      gap = 4,
      minColumnWidth,
      as: Component = "div",
      children,
      className,
      testId,
      ...props
    },
    ref
  ) => {
    const gapValue = getSpacingVar(gap);

    const getGridStyles = () => {
      const baseStyle: React.CSSProperties = {
        gap: gapValue,
      };

      if (minColumnWidth) {
        baseStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
        return baseStyle;
      }

      if (typeof columns === "number") {
        baseStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        return baseStyle;
      }

      if (typeof columns === "object") {
        const cssVars: Record<string, string> = {};

        if (columns.xs !== undefined) {
          cssVars["--grid-cols-xs"] = String(columns.xs);
        }
        if (columns.sm !== undefined) {
          cssVars["--grid-cols-sm"] = String(columns.sm);
        }
        if (columns.md !== undefined) {
          cssVars["--grid-cols-md"] = String(columns.md);
        }
        if (columns.lg !== undefined) {
          cssVars["--grid-cols-lg"] = String(columns.lg);
        }
        if (columns.xl !== undefined) {
          cssVars["--grid-cols-xl"] = String(columns.xl);
        }
        if (columns["2xl"] !== undefined) {
          cssVars["--grid-cols-2xl"] = String(columns["2xl"]);
        }

        const baseColumns =
          columns.xs ||
          columns.sm ||
          columns.md ||
          columns.lg ||
          columns.xl ||
          columns["2xl"] ||
          1;
        baseStyle.gridTemplateColumns = `repeat(${baseColumns}, 1fr)`;

        return { ...baseStyle, ...cssVars };
      }

      return baseStyle;
    };

    const gridStyles = getGridStyles();

    return (
      <Component
        ref={ref}
        className={cn(styles.grid, className)}
        style={{
          ...gridStyles,
          ...props.style,
        }}
        {...(testId && { "data-testid": testId })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = "Grid";
