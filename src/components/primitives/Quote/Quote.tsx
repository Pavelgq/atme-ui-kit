import React from "react";
import cn from "classnames";
import { Root } from "../Root";
import { Typography } from "../Typography";
import { QuoteIcon } from "../Icon/Icons";
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
    <Root
      as="blockquote"
      cite={cite}
      className={cn(styles.quote, className)}
      testId={testId}
      {...props}
    >
      <div className={styles.titleBar}>
        <QuoteIcon size={18} className={styles.quoteSign} />
        {author != null && (
          <Typography variant="caption" as="span" className={styles.author}>
            — {author}
          </Typography>
        )}
      </div>
      <div className={styles.content}>
        <Typography variant="body" as="p" color="secondary" font="content" className={styles.text}>
          {children}
        </Typography>
      </div>
    </Root>
  );
};

Quote.displayName = "Quote";
