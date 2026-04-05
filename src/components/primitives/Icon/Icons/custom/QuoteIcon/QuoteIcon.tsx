import React from "react";
import { Quote, type LucideProps } from "lucide-react";

export const QuoteIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <Quote aria-hidden={decorative} {...props} />;

QuoteIcon.displayName = "QuoteIcon";
