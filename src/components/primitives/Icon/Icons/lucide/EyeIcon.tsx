import React from "react";
import { Eye, type LucideProps } from "lucide-react";

export const EyeIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <Eye aria-hidden={decorative} {...props} />;
