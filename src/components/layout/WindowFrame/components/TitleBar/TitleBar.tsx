import { Stack } from '@components/layout/Stack';
import { Typography } from '@components/primitives/Typography';
import { type FC, type ReactNode } from 'react';
import styles from './TitleBar.module.pcss';
import { Spacer } from '@components/primitives/Spacer/Spacer';

interface TitleBarProps {
  title?: string;
  addonLeft?: ReactNode;
}

export const TitleBar: FC<TitleBarProps> = ({ title, addonLeft }) => {
  return (
    <Stack
      direction="row"
      align="center"
      gap={3}
      {...(styles.wrapper && { className: styles.wrapper })}
    >
      <Stack gap={1.5}>
        <Spacer />
        {addonLeft}
      </Stack>
      <Typography as="h2" size="base" variant="h2" color="primary">
        {title}
      </Typography>
    </Stack>
  );
};
