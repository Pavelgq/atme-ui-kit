import type { TagProps } from "../Tag";

export interface TagGroupItem {
  label: React.ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type TagGroupTag = React.ReactNode | TagGroupItem;

export function isTagGroupItem(tag: TagGroupTag): tag is TagGroupItem {
  return typeof tag === "object" && tag !== null && "label" in tag;
}

export type TagGroupBaseTagProps = Partial<Pick<TagProps, "size" | "variant">>;
