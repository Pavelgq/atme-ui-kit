import React from "react";
import { Heart, type LucideProps } from "lucide-react";

export interface HeartIconProps extends LucideProps {
  /** Залитое сердечко (лайк поставлен) */
  filled?: boolean;
  decorative?: boolean;
  className?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  filled = false,
  decorative = true,
  ...props
}) => (
  <Heart
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    aria-hidden={decorative}
    {...props}
  />
);
