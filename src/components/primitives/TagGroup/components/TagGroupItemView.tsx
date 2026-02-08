import React from "react";
import { Tag } from "../../Tag";
import { TagGroupItemButton } from "./TagGroupItemButton";
import { isTagGroupItem, type TagGroupTag, type TagGroupBaseTagProps } from "../types";

export interface TagGroupItemViewProps {
  tag: TagGroupTag;
  baseTagProps: TagGroupBaseTagProps;
}

export function TagGroupItemView({ tag, baseTagProps }: TagGroupItemViewProps) {
  if (isTagGroupItem(tag)) {
    if (tag.href) {
      return (
        <Tag {...baseTagProps} href={tag.href}>
          {tag.label}
        </Tag>
      );
    }
    if (tag.onClick) {
      return <TagGroupItemButton tag={tag} baseTagProps={baseTagProps} />;
    }
    return (
      <Tag {...baseTagProps}>
        {tag.label}
      </Tag>
    );
  }

  if (typeof tag === "object" && React.isValidElement(tag)) {
    return <>{tag}</>;
  }

  return <Tag {...baseTagProps}>{tag}</Tag>;
}
