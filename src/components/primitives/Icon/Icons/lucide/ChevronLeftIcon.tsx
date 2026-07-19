import React from 'react';
import { ChevronLeft, type LucideProps } from 'lucide-react';

export const ChevronLeftIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <ChevronLeft aria-hidden={decorative} {...props} />;
