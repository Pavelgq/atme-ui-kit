import React, { useEffect, useState } from "react";
import cn from "classnames";
import { AtmeRoot } from "../AtmeRoot";
import { Typography } from "../Typography";
import { BaseComponentProps } from "@components/types";
import { codeToHtml } from "shiki";
import styles from "./CodeBlock.module.pcss";

export interface CodeBlockProps extends BaseComponentProps {
  /** Исходный код */
  code: string;
  /** Язык подсветки (например: typescript, javascript, css, json) */
  lang?: string;
  /** Подпись/имя файла над блоком */
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  lang = "text",
  filename,
  className,
  testId,
}) => {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
      .then((result) => {
        if (!cancelled) setHtml(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (error) {
    return (
      <AtmeRoot
        as="div"
        className={cn(styles.root, styles.error)}
        testId={testId}
        role="alert"
      >
        <Typography variant="caption" as="span" color="secondary">
          Ошибка подсветки: {error.message}
        </Typography>
      </AtmeRoot>
    );
  }

  return (
    <AtmeRoot className={cn(styles.root, className)} testId={testId}>
      {filename != null && (
        <Typography variant="caption" as="div" className={styles.filename}>
          {filename}
        </Typography>
      )}
      <div className={styles.code}>
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            suppressHydrationWarning
          />
        ) : (
          <pre>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </AtmeRoot>
  );
};

CodeBlock.displayName = "CodeBlock";
