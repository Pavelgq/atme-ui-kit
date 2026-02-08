import React, { forwardRef } from "react";
import cn from "classnames";
import type { BaseComponentProps } from "../../types";
import { getSpacingVar } from "@tokens/utils";
import styles from "./Stack.module.pcss";

export type StackDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";
export type StackAlign = "start" | "end" | "center" | "stretch" | "baseline";
export type StackJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

export type StackGap = number | string;

type StackElement =
  | "div"
  | "section"
  | "article"
  | "main"
  | "header"
  | "footer"
  | "aside"
  | "nav";

export interface StackProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "ref"> {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: StackWrap;
  gap?: StackGap;
  as?: StackElement;
  children: React.ReactNode;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "row",
      align = "stretch",
      justify = "start",
      wrap = "nowrap",
      gap = 0,
      as: Component = "div",
      children,
      className,
      testId,
      ...props
    },
    ref
  ) => {
    // Вычисляем значение gap через утилиту
    const gapValue = getSpacingVar(gap);

    return (
      <Component
        ref={ref}
        data-atme-ui
        className={cn(
          styles.stack,
          styles[`stack--direction-${direction}`],
          styles[`stack--align-${align}`],
          styles[`stack--justify-${justify}`],
          styles[`stack--wrap-${wrap}`],
          className
        )}
        style={{ gap: gapValue, ...props.style }}
        {...(testId && { "data-testid": testId })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = "Stack";
