"use client";

import { IconButton } from "@/components/ui/Button";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { IconButtonProps as IconButtonBaseProps } from "@/components/ui/Button";
import type { JSX } from "react";

export type CopyContentButtonProps = {
  /**
   * The content to copy to the clipboard
   */
  content: string;

  /**
   * The prompt to display when the content is copied.
   */
  prompt?: string | undefined | { title: string; description: string };

  /**
   * The duration to display the prompt for.
   */
  duration?: number;
};

/**
 * A button that copies a specified message to the user's clipboard.
 *
 * This component renders a button within the top right corner of the parent
 * component, which will copy the given message to the user's clipboard when
 * clicked.
 *
 * In order for the button to be displayed correctly, the parent component
 * **must** be styled with `relative` positioning.
 *
 * @example
 *
 * `page.tsx`
 *
 * ```tsx
 * import { CopyContentButton } from '@/components';
 *
 * export default function Page() {
 *   return (
 *     <div className='relative w-1/2 rounded bg-muted p-5 font-mono text-sm'>
 *       <span>$ pnpm install @norviah/bump -g</span>
 *
 *       <CopyContentButton message='pnpm install @norviah/bump -g' />
 *     </div>
 *   )
 * }
 * ```
 */
export function CopyContentButton({
  content,
  className,
  disabled,
  onClick,
  prompt = "Copied content to clipboard.",
  duration = 3000,
  ...props
}: CopyContentButtonProps & Omit<IconButtonBaseProps, "icon">): JSX.Element {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <IconButton
      size="small"
      className={cn(
        "absolute end-2 top-2 inline-flex items-center justify-center rounded-lg border border-border p-2 text-foreground-light hover:bg-background/60 hover:text-foreground",
        copied && "pointer-events-none",
        className,
      )}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopied(true);

        toast.success(typeof prompt === "string" ? prompt : prompt.title, {
          description: !(typeof prompt === "string") && prompt.description,
          duration,
        });
      }}
      {...props}
    >
      <CopyIcon className={cn("size-4", !copied ? "fade-in block animate-in" : "fade-out hidden animate-out")} />
      <CheckIcon className={cn("size-4", copied ? "fade-in block animate-in" : "fade-out hidden animate-out")} />
    </IconButton>
  );
}
