import React from "react";
import { Home, type LucideProps } from "lucide-react";

export const HomeIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <Home aria-hidden={decorative} {...props} />;
