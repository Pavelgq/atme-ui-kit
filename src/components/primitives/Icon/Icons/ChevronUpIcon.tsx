import React from "react";
import { Icon, IconProps } from "../Icon";

export const ChevronUpIcon: React.FC<Omit<IconProps, "children" | "svg">> = (
  props
) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
    />
  </Icon>
);
