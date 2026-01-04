import { BaseComponentProps } from "@components/types";
import { FC, useMemo } from "react";
import { SpacingVariant } from "@typings/design";
import { getSpacingVar } from "@tokens/utils";
import cn from "classnames";
import styles from "./Spacer.module.pcss";

export interface SpacerProps extends BaseComponentProps {
  size?: SpacingVariant;
  x?: SpacingVariant;
  y?: SpacingVariant;
  axis?: "x" | "y";
}

export const Spacer: FC<SpacerProps> = ({
  size,
  x,
  y,
  axis = "y",
  className,
  testId,
  ...props
}) => {
  const spacingStyles = useMemo(() => {
    const width = getSpacingVar(x ?? (size && axis === "x" ? size : undefined));
    const height = getSpacingVar(
      y ?? (size && axis === "y" ? size : undefined)
    );

    return {
      width,
      height,
    };
  }, [size, x, y, axis]);

  return (
    <div
      className={cn(styles.spacer, className)}
      style={spacingStyles}
      {...(testId && { "data-testid": testId })}
      {...props}
    />
  );
};
