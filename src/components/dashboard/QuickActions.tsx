"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "primary" | "success" | "info" | "warn";
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  className?: string;
  columns?: 1 | 2 | 3;
}

export function QuickActions({ 
  actions, 
  title = "Quick Actions",
  className,
  columns = 1
}: QuickActionsProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("grid gap-2", gridCols[columns])}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                variant={action.variant || "outline"}
                className="w-full justify-start h-auto p-3"
                onClick={action.onClick}
                disabled={action.disabled}
              >
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
