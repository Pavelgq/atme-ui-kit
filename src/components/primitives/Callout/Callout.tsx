import React from "react";
import cn from "classnames";
import { Root } from "../Root";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { BaseComponentProps } from "@components/types";
import styles from "./Callout.module.pcss";

export type CalloutTone = "info" | "warning" | "success";

export interface CalloutProps
  extends BaseComponentProps,
    React.HTMLAttributes<HTMLElement> {
  tone?: CalloutTone;
  textAs?: React.ElementType;
  children: React.ReactNode;
}

const renderIcon = (tone: CalloutTone) => {
  switch (tone) {
    case "warning":
      return (
        <Icon
          decorative
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3.5 3.5 19h17L12 3.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.25v4.25"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.25h.01"
          />
        </Icon>
      );
    case "success":
      return (
        <Icon
          decorative
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11 14.75 15 9.75"
          />
          <circle
            cx="12"
            cy="12"
            r="8.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
      );
    case "info":
    default:
      return (
        <Icon
          decorative
          className={styles.iconSvg}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="8.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8h.01"
          />
        </Icon>
      );
  }
};

export const Callout: React.FC<CalloutProps> = ({
  className,
  testId,
  children,
  tone = "info",
  textAs = "div",
  ...props
}) => {
  return (
    <Root
      as="aside"
      className={cn(styles.callout, styles[`callout--tone-${tone}`], className)}
      testId={testId}
      {...props}
    >
      <div className={styles.icon}>{renderIcon(tone)}</div>
      <Typography variant="body" as={textAs} className={styles.text}>
        {children}
      </Typography>
    </Root>
  );
};

Callout.displayName = "Callout";

