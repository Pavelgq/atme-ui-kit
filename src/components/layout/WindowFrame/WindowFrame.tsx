import { FC, ReactNode } from "react";
import cn from "classnames";
import { BaseComponentProps } from "@components/types";
import { Stack } from "../Stack";
import { ActionButton, TitleBar } from "./components";
import { CloseIcon, FullscreenIcon } from "@components/primitives/Icon/Icons";
import styles from "./WindowFrame.module.pcss";

export interface WindowFrameProps extends BaseComponentProps {
  children?: ReactNode;
  title?: string;
}

export const WindowFrame: FC<WindowFrameProps> = ({
  children,
  title = "",
  className,
  testId,
}) => {
  return (
    <Stack
      direction="column"
      justify="center"
      className={cn(styles.frame, className)}
      {...(testId && { testId })}
    >
      <TitleBar
        addonLeft={
          <Stack gap={1.5}>
            <ActionButton icon={<CloseIcon />} hint="Закрыть" />
            <ActionButton
              icon={<FullscreenIcon />}
              hint="Полноэкранный режим"
            />
          </Stack>
        }
        title={title}
      />
      <div className={styles.frameContent}>{children}</div>
    </Stack>
  );
};
