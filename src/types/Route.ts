import type { LucideIcon } from "lucide-react";
import type { LinkProps } from "next/link";
import type { UrlObject } from "node:url";

export interface Route {
  title: string;
  icon: LucideIcon;
  path: Exclude<LinkProps<unknown>["href"], UrlObject>;
}
