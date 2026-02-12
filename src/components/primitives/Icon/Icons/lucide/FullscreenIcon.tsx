import React from "react";
import { Maximize, type LucideProps } from "lucide-react";

export const FullscreenIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <Maximize aria-hidden={decorative} {...props} />;
