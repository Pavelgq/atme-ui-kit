import React from "react";
import { FileText, type LucideProps } from "lucide-react";

export const FileTextIcon: React.FC<LucideProps & { decorative?: boolean }> = ({
  decorative = true,
  ...props
}) => <FileText aria-hidden={decorative} {...props} />;
