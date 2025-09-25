"use client";

import { CircleAlertIcon, CircleCheckIcon, InfoIcon } from "lucide-react";
import { Toaster as BaseProvider, type ToasterProps } from "sonner";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ToastProvider({ className, ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <BaseProvider
      className={cn("toaster group", className)}
      position="bottom-left"
      toastOptions={{
        classNames: {
          toast: cn(className, "toaster group toast bg-card text-foreground-bold border-border shadow-lg font-normal"),
          title: "font-semibold text-foreground-bold",
          description: "text-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={{
        info: <InfoIcon className="fill-nord-blue text-background" />,
        warning: <CircleAlertIcon className="fill-nord-yellow text-background" />,
        error: <CircleAlertIcon className="fill-nord-red text-background" />,
        success: <CircleCheckIcon className="fill-nord-green text-background" />,
      }}
      theme={theme as ToasterProps["theme"]}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
