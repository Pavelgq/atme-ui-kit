import React from "react";
import cn from "classnames";
import { AtmeRoot } from "../AtmeRoot";
import { Typography } from "../Typography";
import { BaseComponentProps } from "@components/types";
import styles from "./Quote.module.pcss";

export interface QuoteProps extends BaseComponentProps, React.HTMLAttributes<HTMLElement> {
  /** Автор цитаты */
  author?: React.ReactNode;
  /** URL источника (атрибут cite) */
  cite?: string;
  children: React.ReactNode;
}

export const Quote: React.FC<QuoteProps> = ({
  author,
  cite,
  className,
  testId,
  children,
  ...props
}) => {
  return (
    <AtmeRoot
      as="blockquote"
      cite={cite}
      className={cn(styles.quote, className)}
      testId={testId}
      {...props}
    >
      <Typography variant="body" as="p" color="secondary" className={styles.text}>
        {children}
      </Typography>
      {author != null && (
        <Typography variant="caption" as="footer" className={styles.author}>
          — {author}
        </Typography>
      )}
    </AtmeRoot>
  );
};

Quote.displayName = "Quote";
