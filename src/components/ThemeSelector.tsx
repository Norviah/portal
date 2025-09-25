"use client";

import { IconButton } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { setTheme, theme: currentTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={currentTheme === "light" ? SunIcon : MoonIcon} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={4} className="text-foreground/80">
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem onClick={() => setTheme("light")} className={cn(currentTheme === "light" && "bg-accent text-accent-foreground")}>
            <SunIcon />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")} className={cn(currentTheme === "dark" && "bg-accent text-accent-foreground")}>
            <MoonIcon />
            Dark
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")} className={cn(currentTheme === "system" && "bg-accent text-accent-foreground")}>
          <MonitorIcon />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
