import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { ThemeSelector } from "@/components/ThemeSelector";
import { IconButton } from "@/components/ui/Button";
import type { LayoutProps } from "@/types/components/LayoutProps";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 right-0 w-full flex justify-between items-center p-3 z-10">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <HomeIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <ThemeSelector />
      </div>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center px-4 pt-12 pb-4">
        {children}
      </div>
    </div>
  );
}
