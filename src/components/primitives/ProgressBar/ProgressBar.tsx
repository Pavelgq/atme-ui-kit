import React from "react";
import cn from "classnames";
import { AtmeRoot } from "../AtmeRoot";
import { BaseComponentProps } from "@components/types";
import styles from "./ProgressBar.module.pcss";

export type ProgressBarSize = "sm" | "md" | "lg";
export type ProgressBarTone = "primary" | "secondary" | "success" | "warning";

export interface ProgressBarProps
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: number;
  max?: number;
  segments?: number;
  size?: ProgressBarSize;
  tone?: ProgressBarTone;
  showValueLabel?: boolean;
  valueLabel?: React.ReactNode;
  sequentialAnimation?: boolean;
  animationStepMs?: number;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  segments = 10,
  size = "md",
  tone = "secondary",
  showValueLabel = false,
  valueLabel,
  sequentialAnimation = false,
  animationStepMs = 80,
  className,
  testId,
  "aria-label": ariaLabel,
  ...props
}) => {
  const safeMax = Math.max(1, Math.floor(max));
  const safeValue = clamp(value, 0, safeMax);
  const safeSegments = Math.max(1, Math.floor(segments));
  const completion = safeValue / safeMax;
  const activeSegments = Math.round(completion * safeSegments);

  const renderedValueLabel = showValueLabel
    ? (valueLabel ?? `${Math.round(safeValue)} / ${safeMax}`)
    : null;

  return (
    <AtmeRoot className={cn(styles.root, styles[`root--${size}`], className)} testId={testId} {...props}>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={ariaLabel ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.round(safeValue)}
      >
        <div className={styles.segments}>
          {Array.from({ length: safeSegments }).map((_, index) => (
            <span
              key={index}
              className={cn(
                styles.segment,
                styles[`segment--${tone}`],
                index < activeSegments && styles["segment--active"],
                sequentialAnimation && index < activeSegments && styles["segment--sequential"]
              )}
              style={
                sequentialAnimation
                  ? ({
                      "--segment-delay": `${index * animationStepMs}ms`,
                    } as React.CSSProperties)
                  : undefined
              }
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      {renderedValueLabel && <span className={styles.valueLabel}>{renderedValueLabel}</span>}
    </AtmeRoot>
  );
};

ProgressBar.displayName = "ProgressBar";
