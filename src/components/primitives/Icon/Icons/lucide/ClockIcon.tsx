import React from "react";
import { Clock, type LucideProps } from "lucide-react";

export const ClockIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <Clock aria-hidden={decorative} {...props} />;
