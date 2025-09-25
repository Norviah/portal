import { cn } from "@/lib/utils";
import BaseLink, { type LinkProps } from "next/link";

export type InlineLinkProps = Omit<LinkProps<unknown>, "children"> & {
  text: string;
};

export function InlineLink({ className, text, ...props }: InlineLinkProps) {
  return (
    <BaseLink className={cn("text-nord-blue hover:underline", className)} {...props}>
      {text}
    </BaseLink>
  );
}
