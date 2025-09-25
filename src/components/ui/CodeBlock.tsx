import { CopyContentButton, type CopyContentButtonProps } from "@/components/CopyContentButton";

import { cn } from "@/lib/utils";

import type { RequireAllOrNone } from "type-fest";
import type React from "react";

type DivProps = React.JSX.IntrinsicElements["div"];

type CodeBlockBaseProps = {
  /**
   * Whether to display a copy button for the code block.
   */
  copy?: boolean;
} & CopyContentButtonProps;

export type CodeBlockProps = DivProps & RequireAllOrNone<CodeBlockBaseProps, "copy" | "content">;

export function CodeBlock({ copy, className, content: message, prompt, duration, ...props }: CodeBlockProps): React.JSX.Element {
  return (
    <div className={cn("whitespace-pre rounded border border-border bg-accent p-5 font-mono font-semibold text-sm", copy && "relative", className)} {...props}>
      {props.children}

      {copy && <CopyContentButton content={message} prompt={prompt} duration={duration} />}
    </div>
  );
}
