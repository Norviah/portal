import { Slot } from "@radix-ui/react-slot";
import { Spinner } from "../icons";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import type { RequireExactlyOne } from "type-fest";
import type { LucideIcon } from "lucide-react";

import type * as React from "react";

export const buttonVariants = cva(
  "disabled:opacity-60 disabled:pointer-events-none relative justify-center inline-flex items-center text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-success data-[state=open]:bg-selection data-[state=open]:outline-success data-[state=open]:border-button-hover text-xs text-foreground cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "hover:bg-foreground/[.08] active:bg-foreground/[.1] bg-background dark:bg-muted dark:hover:bg-muted/90 text-foreground dark:active:bg-muted/80 border border-strong shadow-sm",
        primary: "hover:bg-primary/85 active:bg-primary/75 bg-primary text-primary-foreground border border-strong shadow-sm",
        destructive: "hover:bg-destructive/85 active:bg-destructive/75 bg-destructive text-destructive-foreground border border-strong shadow-sm",
        info: "bg-info text-info-foreground hover:bg-info/85 active:bg-info/75 border border-strong shadow-sm",
        success: "bg-success text-success-foreground hover:bg-success/85 active:bg-success/75 border border-strong shadow-sm",
        warn: "bg-warn text-warn-foreground hover:bg-warn/70 active:bg-warn/60 border border-strong shadow-sm",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-accent border border-border shadow-sm",
        ghost: "hover:bg-muted/70 active:bg-muted",
        outline: "hover:bg-accent active:bg-accent bg-background text-foreground border border-border",
      },
      size: {
        default: "h-9 px-2.5 py-1",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-0",
        smallIcon: "h-8 w-8 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export function Button({ className, variant, size, asChild = false, loading, disabled, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp disabled={loading || disabled} data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {loading ? <Spinner /> : children}
    </Comp>
  );
}

export type IconButtonProps = Omit<ButtonProps, "size"> &
  RequireExactlyOne<
    {
      children: React.ReactNode | React.ReactNode[];
      icon: LucideIcon;
      size?: "icon" | "small";
    },
    "icon" | "children"
  >;

export function IconButton({ icon: Icon, children, size = "icon", ...props }: IconButtonProps) {
  return (
    <Button variant="outline" size={size === "small" ? "smallIcon" : size} {...props}>
      {Icon ? <Icon className="size-4" /> : children}
    </Button>
  );
}
