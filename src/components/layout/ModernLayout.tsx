"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModernLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "centered" | "fullscreen";
}

export function ModernLayout({ 
  children, 
  className, 
  variant = "default" 
}: ModernLayoutProps) {
  const baseClasses = "min-h-screen bg-gradient-to-br from-background via-background to-muted/20";
  
  const variantClasses = {
    default: "container mx-auto px-4 py-8",
    centered: "flex items-center justify-center px-4",
    fullscreen: "w-full h-screen"
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
}

export function ModernCard({ 
  children, 
  className, 
  variant = "default",
  padding = "md"
}: ModernCardProps) {
  const baseClasses = "rounded-xl border transition-all duration-200";
  
  const variantClasses = {
    default: "bg-card shadow-sm hover:shadow-md",
    elevated: "bg-card shadow-lg hover:shadow-xl",
    outlined: "bg-transparent border-2 hover:bg-muted/50",
    glass: "bg-card/80 backdrop-blur-sm border-white/20 shadow-lg"
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8"
  };

  return (
    <div className={cn(
      baseClasses, 
      variantClasses[variant], 
      paddingClasses[padding], 
      className
    )}>
      {children}
    </div>
  );
}

interface ModernGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
}

export function ModernGrid({ 
  children, 
  className, 
  cols = 2, 
  gap = "md" 
}: ModernGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  return (
    <div className={cn(
      "grid",
      gridCols[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}

interface ModernSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
}

export function ModernSection({ 
  children, 
  title, 
  description, 
  className,
  headerClassName
}: ModernSectionProps) {
  return (
    <section className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className={cn("space-y-2", headerClassName)}>
          {title && (
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
