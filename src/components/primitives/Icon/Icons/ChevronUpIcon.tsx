import React from "react";
import { Icon, IconProps } from "../Icon";

export const ChevronUpIcon: React.FC<Omit<IconProps, "children" | "svg">> = (
  props
) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </Icon>
);
