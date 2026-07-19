import { type FC, type ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { type BaseComponentProps } from '@components/types';
import { Stack } from '../Stack';
import { ActionButton, TitleBar } from './components';
import { CloseIcon, FullscreenIcon } from '@components/primitives/Icon/Icons';
import styles from './WindowFrame.module.pcss';

export interface WindowFrameProps extends BaseComponentProps {
  children?: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export const WindowFrame: FC<WindowFrameProps> = ({
  children,
  title = '',
  className,
  testId,
  actions,
}) => {
  const defaultActions = useMemo(
    () => (
      <Stack gap={1.5}>
        <ActionButton
          icon={<CloseIcon size={10} strokeWidth={2.5} />}
          hint="Закрыть"
          variant="close"
        />
        <ActionButton
          icon={<FullscreenIcon size={8} strokeWidth={2.5} />}
          hint="Полноэкранный режим"
          variant="expand"
        />
      </Stack>
    ),
    []
  );

  return (
    <Stack
      direction="column"
      justify="center"
      className={cn(styles.frame, className)}
      {...(testId && { testId })}
    >
      <TitleBar addonLeft={actions ?? defaultActions} title={title} />
      <div className={styles.frameContent}>{children}</div>
    </Stack>
  );
};
