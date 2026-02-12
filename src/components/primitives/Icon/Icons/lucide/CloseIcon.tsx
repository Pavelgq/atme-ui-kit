import React from "react";
import { X, type LucideProps } from "lucide-react";

export const CloseIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <X aria-hidden={decorative} {...props} />;
