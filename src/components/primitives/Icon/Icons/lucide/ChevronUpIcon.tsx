import React from "react";
import { ChevronUp, type LucideProps } from "lucide-react";

export const ChevronUpIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <ChevronUp aria-hidden={decorative} {...props} />;
