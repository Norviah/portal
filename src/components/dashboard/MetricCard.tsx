"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  progress?: {
    value: number;
    label?: string;
  };
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  progress,
  badge,
  className
}: MetricCardProps) {
  return (
    <Card className={cn("bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
            <Icon className="h-4 w-4 text-white" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{value}</div>
            {badge && (
              <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700/50">
                {badge.text}
              </Badge>
            )}
          </div>
          
          {progress && (
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-blue-700 dark:text-blue-300">{progress.label || "Progress"}</span>
                <span className="text-blue-700 dark:text-blue-300 font-medium">{progress.value}%</span>
              </div>
              <Progress value={progress.value} className="h-2" />
            </div>
          )}
          
          {trend && (
            <p className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {trend.value}
            </p>
          )}
          
          {description && (
            <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
