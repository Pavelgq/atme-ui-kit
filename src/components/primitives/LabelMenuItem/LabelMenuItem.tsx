import React from 'react';
import { Typography } from '../Typography';
import type { IconProps } from '../Icon';
import styles from './LabelMenuItem.module.pcss';

export interface LabelMenuItemProps {
  label: string;
  icon: React.ComponentType<Partial<IconProps>>;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  iconSize?: string | number;
}

export const LabelMenuItem: React.FC<LabelMenuItemProps> = ({
  label,
  icon: IconComponent,
  onClick,
  disabled = false,
  className,
  iconSize = '50px',
}) => {
  const classNames = [styles.labelMenuItem, className].filter(Boolean).join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      <div className={styles.icon}>
        <IconComponent decorative width={iconSize} height={iconSize} />
      </div>
      <Typography as="span" variant="body" className={styles.label}>
        {label}
      </Typography>
    </button>
  );
};

LabelMenuItem.displayName = 'LabelMenuItem';

