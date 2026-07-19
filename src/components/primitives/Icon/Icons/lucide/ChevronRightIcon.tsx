import React from 'react';
import { ChevronRight, type LucideProps } from 'lucide-react';

export const ChevronRightIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <ChevronRight aria-hidden={decorative} {...props} />;
