import React from "react";
import cn from "classnames";
import { Typography } from "../Typography";
import type { IconProps } from "../Icon";
import styles from "./LabelMenuItem.module.pcss";

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
  iconSize = "50px",
}) => {
  return (
    <button
      data-atme-ui
      className={cn(styles.labelMenuItem, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.icon}>
        <IconComponent decorative width={iconSize} height={iconSize} />
      </div>
      <Typography
        as="span"
        variant="body"
        color="secondary"
        className={styles.label}
      >
        {label}
      </Typography>
    </button>
  );
};

LabelMenuItem.displayName = "LabelMenuItem";
