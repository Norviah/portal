"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

import { Calendar, BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { AdvancedGanttChart } from "./AdvancedGanttChart";

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  dependencies: string[];
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  progress: number;
  forecastedStart?: string;
  forecastedEnd?: string;
  actualStart?: string;
  actualEnd?: string;
}

interface GanttChartProps {
  tasks: GanttTask[];
  onTaskUpdate?: (taskId: string, updates: Partial<GanttTask>) => void;
  className?: string;
}

type ViewMode = 'forecasted' | 'actual' | 'current' | 'comparison';

export function GanttChart({ tasks, onTaskUpdate, className }: GanttChartProps) {
  return (
    <AdvancedGanttChart
      tasks={tasks}
      onTaskUpdate={onTaskUpdate}
      className={className}
    />
  );
}
