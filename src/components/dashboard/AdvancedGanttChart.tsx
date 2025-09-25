"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Separator } from "@/components/ui/Separator";

import { 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Play, 
  Eye, 
  EyeOff, 
  Layers, 
  GitCompare, 
  Settings, 
  Filter,
  Maximize2,
  Minimize2,
  RotateCcw,
  Download,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  assignee?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  phase?: string;
}

interface AdvancedGanttChartProps {
  tasks: GanttTask[];
  onTaskUpdate?: (taskId: string, updates: Partial<GanttTask>) => void;
  className?: string;
}

type ViewMode = 'separate' | 'overlay' | 'comparison' | 'variance';
type TimelineLayer = 'forecasted' | 'actual' | 'current';
type DisplayMode = 'timeline' | 'table' | 'kanban' | 'calendar';

interface VisibilitySettings {
  forecasted: boolean;
  actual: boolean;
  current: boolean;
  dependencies: boolean;
  progress: boolean;
  assignees: boolean;
  priorities: boolean;
  phases: boolean;
  categories: boolean;
  criticalPath: boolean;
  milestones: boolean;
}

interface ViewSettings {
  mode: ViewMode;
  displayMode: DisplayMode;
  timelineScale: 'day' | 'week' | 'month' | 'quarter';
  showWeekends: boolean;
  showHolidays: boolean;
  autoFit: boolean;
  compactMode: boolean;
  showGrid: boolean;
  showLabels: boolean;
  opacity: number;
  height: number;
}

export function AdvancedGanttChart({ tasks, onTaskUpdate, className }: AdvancedGanttChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overlay');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('timeline');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [visibility, setVisibility] = useState<VisibilitySettings>({
    forecasted: true,
    actual: true,
    current: true,
    dependencies: true,
    progress: true,
    assignees: false,
    priorities: true,
    phases: false,
    categories: false,
    criticalPath: true,
    milestones: true
  });

  const [viewSettings, setViewSettings] = useState<ViewSettings>({
    mode: 'overlay',
    displayMode: 'timeline',
    timelineScale: 'week',
    showWeekends: true,
    showHolidays: false,
    autoFit: true,
    compactMode: false,
    showGrid: true,
    showLabels: true,
    opacity: 0.8,
    height: 400
  });

  const chartRef = useRef<HTMLDivElement>(null);

  // Calculate current layout for each task
  const tasksWithLayouts = useMemo(() => {
    return tasks.map(task => {
      const forecastedStart = new Date(task.forecastedStart || task.startDate);
      const forecastedEnd = new Date(task.forecastedEnd || task.endDate);
      const actualStart = task.actualStart ? new Date(task.actualStart) : null;
      const actualEnd = task.actualEnd ? new Date(task.actualEnd) : null;

      let currentStart = forecastedStart;
      let currentEnd = forecastedEnd;

      if (actualStart && actualEnd) {
        // If we have both actual start and end, calculate variance
        const forecastedDuration = forecastedEnd.getTime() - forecastedStart.getTime();
        const actualDuration = actualEnd.getTime() - actualStart.getTime();
        const variance = actualDuration - forecastedDuration;
        
        // Current layout adjusts future tasks based on variance
        currentStart = actualEnd;
        currentEnd = new Date(actualEnd.getTime() + forecastedDuration);
      } else if (actualStart) {
        // If we only have actual start, adjust based on remaining forecasted duration
        const remainingDuration = forecastedEnd.getTime() - actualStart.getTime();
        currentStart = actualStart;
        currentEnd = new Date(actualStart.getTime() + remainingDuration);
      }

      return {
        ...task,
        forecastedStart,
        forecastedEnd,
        actualStart,
        actualEnd,
        currentStart,
        currentEnd,
        variance: actualStart && actualEnd ? 
          (actualEnd.getTime() - actualStart.getTime()) - (forecastedEnd.getTime() - forecastedStart.getTime()) : 0
      };
    });
  }, [tasks]);

  // Calculate project timeline bounds
  const timelineBounds = useMemo(() => {
    const allDates = tasksWithLayouts.flatMap(task => [
      task.forecastedStart,
      task.forecastedEnd,
      task.actualStart,
      task.actualEnd,
      task.currentStart,
      task.currentEnd
    ]).filter(Boolean) as Date[];

    if (allDates.length === 0) return { start: new Date(), end: new Date() };

    const start = new Date(Math.min(...allDates.map(d => d.getTime())));
    const end = new Date(Math.max(...allDates.map(d => d.getTime())));
    
    return { start, end };
  }, [tasksWithLayouts]);

  // Generate timeline grid
  const timelineGrid = useMemo(() => {
    const { start, end } = timelineBounds;
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const grid = [];
    
    const interval = viewSettings.timelineScale === 'day' ? 1 : 
                    viewSettings.timelineScale === 'week' ? 7 : 
                    viewSettings.timelineScale === 'month' ? 30 : 90;
    
    for (let i = 0; i <= days; i += interval) {
      const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      grid.push(date);
    }
    
    return grid;
  }, [timelineBounds, viewSettings.timelineScale]);

  const getTaskPosition = (task: typeof tasksWithLayouts[0], layer: TimelineLayer) => {
    const { start, end } = (() => {
      switch (layer) {
        case 'forecasted':
          return { start: task.forecastedStart, end: task.forecastedEnd };
        case 'actual':
          return { start: task.actualStart, end: task.actualEnd };
        case 'current':
          return { start: task.currentStart, end: task.currentEnd };
        default:
          return { start: task.forecastedStart, end: task.forecastedEnd };
      }
    })();

    if (!start || !end) return { left: 0, width: 0, visible: false };

    const projectStart = timelineBounds.start.getTime();
    const taskStart = start.getTime();
    const taskEnd = end.getTime();
    
    const left = ((taskStart - projectStart) / (timelineBounds.end.getTime() - projectStart)) * 100;
    const width = ((taskEnd - taskStart) / (timelineBounds.end.getTime() - projectStart)) * 100;
    
    return { 
      left: Math.max(0, left), 
      width: Math.max(1, width),
      visible: true
    };
  };

  const getStatusColor = (status: string, layer: TimelineLayer) => {
    const baseColors = {
      'not-started': 'bg-gray-200 text-gray-800',
      'in-progress': 'bg-blue-200 text-blue-800',
      'completed': 'bg-green-200 text-green-800',
      'delayed': 'bg-red-200 text-red-800'
    };

    const layerStyles = {
      'forecasted': 'border-2 border-dashed',
      'actual': 'border-2 border-solid',
      'current': 'border-2 border-dotted'
    };

    return `${baseColors[status as keyof typeof baseColors]} ${layerStyles[layer]}`;
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return 'bg-red-100 border-red-300'; // Delayed
    if (variance < 0) return 'bg-green-100 border-green-300'; // Ahead of schedule
    return 'bg-blue-100 border-blue-300'; // On schedule
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-orange-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const renderTaskBar = (task: typeof tasksWithLayouts[0], layer: TimelineLayer, index: number) => {
    if (!visibility[layer as keyof VisibilitySettings]) return null;

    const position = getTaskPosition(task, layer);
    if (!position.visible) return null;

    const isSelected = selectedTask === task.id;
    const isHovered = hoveredTask === task.id;
    const variance = task.variance;
    
    return (
      <div
        key={`${task.id}-${layer}`}
        className={cn(
          "absolute h-8 rounded flex items-center px-2 text-xs font-medium cursor-pointer transition-all group",
          getStatusColor(task.status, layer),
          getPriorityColor(task.priority),
          isSelected && "ring-2 ring-blue-500 z-10",
          isHovered && "ring-1 ring-gray-400 z-5",
          viewMode === 'overlay' && "opacity-80",
          layer === 'actual' && variance !== 0 && getVarianceColor(variance)
        )}
        style={{
          left: `${position.left}%`,
          width: `${position.width}%`,
          top: index * (viewSettings.compactMode ? 30 : 40),
          opacity: viewMode === 'overlay' ? viewSettings.opacity : 1,
          zIndex: layer === 'forecasted' ? 1 : layer === 'actual' ? 2 : 3
        }}
        onClick={() => setSelectedTask(isSelected ? null : task.id)}
        onMouseEnter={() => setHoveredTask(task.id)}
        onMouseLeave={() => setHoveredTask(null)}
      >
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className="truncate">{task.name}</span>
          {visibility.progress && task.progress > 0 && (
            <span className="text-xs opacity-75">
              {task.progress}%
            </span>
          )}
          {visibility.assignees && task.assignee && (
            <span className="text-xs opacity-75">
              {task.assignee}
            </span>
          )}
        </div>
        
        {/* Progress bar overlay */}
        {visibility.progress && task.progress > 0 && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 rounded"
            style={{ width: `${task.progress}%` }}
          />
        )}
        
        {/* Layer indicator */}
        {viewMode === 'overlay' && (
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border border-gray-400 text-xs">
            {layer === 'forecasted' ? 'F' : layer === 'actual' ? 'A' : 'C'}
          </div>
        )}
      </div>
    );
  };

  const renderOverlayView = () => {
    return (
      <div className="space-y-4">
        {/* Layer Legend */}
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium">Timeline Layers:</span>
          {['forecasted', 'actual', 'current'].map((layer) => (
            <div key={layer} className="flex items-center gap-2">
              <div className={cn(
                "w-4 h-4 rounded border-2",
                layer === 'forecasted' ? "border-dashed bg-gray-200" :
                layer === 'actual' ? "border-solid bg-blue-200" :
                "border-dotted bg-green-200"
              )} />
              <span className="capitalize">{layer}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setVisibility(prev => ({ ...prev, [layer]: !prev[layer as keyof VisibilitySettings] }))}
              >
                {visibility[layer as keyof VisibilitySettings] ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </Button>
            </div>
          ))}
        </div>

        {/* Overlay Chart */}
        <div className="relative bg-gray-50 rounded overflow-hidden" style={{ height: `${viewSettings.height}px` }}>
          {tasksWithLayouts.map((task, index) => (
            <div key={task.id} className="relative">
              {['forecasted', 'actual', 'current'].map((layer) => 
                renderTaskBar(task, layer as TimelineLayer, index)
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSeparateView = () => {
    return (
      <div className="space-y-6">
        {['forecasted', 'actual', 'current'].map((layer) => (
          <div key={layer}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={layer === 'forecasted' ? 'default' : 'secondary'}>
                  {layer === 'forecasted' ? 'Forecasted' : layer === 'actual' ? 'Actual' : 'Current'}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setVisibility(prev => ({ ...prev, [layer]: !prev[layer as keyof VisibilitySettings] }))}
                >
                  {visibility[layer as keyof VisibilitySettings] ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                </Button>
              </div>
              {layer === 'actual' && (
                <span className="text-xs text-muted-foreground">
                  (Based on actual data)
                </span>
              )}
              {layer === 'current' && (
                <span className="text-xs text-muted-foreground">
                  (Adjusted forecast)
                </span>
              )}
            </div>
            <div className="relative bg-gray-50 rounded overflow-hidden" style={{ height: `${viewSettings.height / 3}px` }}>
              {tasksWithLayouts.map((task, index) => 
                renderTaskBar(task, layer as TimelineLayer, index)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderComparisonView = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Forecasted vs Actual</h4>
          <div className="relative bg-gray-50 rounded overflow-hidden" style={{ height: `${viewSettings.height / 2}px` }}>
            {tasksWithLayouts.map((task, index) => (
              <div key={task.id} className="relative">
                {renderTaskBar(task, 'forecasted', index)}
                {renderTaskBar(task, 'actual', index)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Actual vs Current</h4>
          <div className="relative bg-gray-50 rounded overflow-hidden" style={{ height: `${viewSettings.height / 2}px` }}>
            {tasksWithLayouts.map((task, index) => (
              <div key={task.id} className="relative">
                {renderTaskBar(task, 'actual', index)}
                {renderTaskBar(task, 'current', index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVarianceView = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-green-600">
              {tasksWithLayouts.filter(t => t.variance < 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Ahead of Schedule</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-blue-600">
              {tasksWithLayouts.filter(t => t.variance === 0).length}
            </div>
            <div className="text-sm text-muted-foreground">On Schedule</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-red-600">
              {tasksWithLayouts.filter(t => t.variance > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Delayed</div>
          </div>
        </div>
        
        <div className="relative bg-gray-50 rounded overflow-hidden" style={{ height: `${viewSettings.height}px` }}>
          {tasksWithLayouts.map((task, index) => {
            const position = getTaskPosition(task, 'actual');
            if (!position.visible) return null;
            
            return (
              <div
                key={task.id}
                className={cn(
                  "absolute h-8 rounded flex items-center px-2 text-xs font-medium cursor-pointer transition-all",
                  getVarianceColor(task.variance),
                  getPriorityColor(task.priority)
                )}
                style={{
                  left: `${position.left}%`,
                  width: `${position.width}%`,
                  top: index * 40
                }}
                onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
              >
                <span className="truncate">{task.name}</span>
                <span className="ml-2 text-xs">
                  {task.variance > 0 ? '+' : ''}{Math.round(task.variance / (1000 * 60 * 60 * 24))}d
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimelineHeader = () => {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Timeline</span>
          <span>
            {timelineBounds.start.toLocaleDateString()} - {timelineBounds.end.toLocaleDateString()}
          </span>
        </div>
        <div className="relative h-6 bg-gray-100 rounded">
          {timelineGrid.map((date, index) => (
            <div
              key={index}
              className="absolute top-0 h-full border-l border-gray-300"
              style={{
                left: `${((date.getTime() - timelineBounds.start.getTime()) / (timelineBounds.end.getTime() - timelineBounds.start.getTime())) * 100}%`
              }}
            >
              <span className="absolute -top-5 left-0 text-xs text-muted-foreground">
                {date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  ...(viewSettings.timelineScale === 'month' || viewSettings.timelineScale === 'quarter' ? { year: 'numeric' } : {})
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className, isFullscreen && "fixed inset-0 z-50 bg-background p-4")}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Advanced Gantt Chart
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Label>View Mode:</Label>
                <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="separate">Separate</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                    <SelectItem value="comparison">Comparison</SelectItem>
                    <SelectItem value="variance">Variance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Label>Scale:</Label>
                <Select value={viewSettings.timelineScale} onValueChange={(value: any) => setViewSettings(prev => ({ ...prev, timelineScale: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label>Height:</Label>
                <Slider
                  value={[viewSettings.height]}
                  onValueChange={([value]) => setViewSettings(prev => ({ ...prev, height: value }))}
                  min={200}
                  max={800}
                  step={50}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">{viewSettings.height}px</span>
              </div>

              <div className="flex items-center gap-2">
                <Label>Opacity:</Label>
                <Slider
                  value={[viewSettings.opacity * 100]}
                  onValueChange={([value]) => setViewSettings(prev => ({ ...prev, opacity: value / 100 }))}
                  min={10}
                  max={100}
                  step={10}
                  className="w-32"
                />
                <span className="text-sm text-muted-foreground">{Math.round(viewSettings.opacity * 100)}%</span>
              </div>
            </div>

            {/* Visibility Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium">Show:</span>
              {Object.entries(visibility).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, [key]: !!checked }))}
                  />
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Header */}
          {renderTimelineHeader()}

          {/* Gantt Chart */}
          <div className="space-y-4">
            {viewMode === 'overlay' && renderOverlayView()}
            {viewMode === 'separate' && renderSeparateView()}
            {viewMode === 'comparison' && renderComparisonView()}
            {viewMode === 'variance' && renderVarianceView()}
          </div>

          {/* Task Details */}
          {selectedTask && (
            <Card className="mt-4">
              <CardContent className="pt-4">
                {(() => {
                  const task = tasksWithLayouts.find(t => t.id === selectedTask);
                  if (!task) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-muted-foreground">Task Details</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Forecasted</h5>
                          <div className="space-y-1 text-sm">
                            <p>Start: {task.forecastedStart.toLocaleDateString()}</p>
                            <p>End: {task.forecastedEnd.toLocaleDateString()}</p>
                            <p>Duration: {Math.round((task.forecastedEnd.getTime() - task.forecastedStart.getTime()) / (1000 * 60 * 60 * 24))} days</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Actual</h5>
                          <div className="space-y-1 text-sm">
                            {task.actualStart && task.actualEnd ? (
                              <>
                                <p>Start: {task.actualStart.toLocaleDateString()}</p>
                                <p>End: {task.actualEnd.toLocaleDateString()}</p>
                                <p>Duration: {Math.round((task.actualEnd.getTime() - task.actualStart.getTime()) / (1000 * 60 * 60 * 24))} days</p>
                                <p className={cn(
                                  "font-medium",
                                  task.variance > 0 ? "text-red-600" : task.variance < 0 ? "text-green-600" : "text-blue-600"
                                )}>
                                  Variance: {task.variance > 0 ? '+' : ''}{Math.round(task.variance / (1000 * 60 * 60 * 24))} days
                                </p>
                              </>
                            ) : (
                              <p className="text-muted-foreground">No actual data yet</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Current Forecast</h5>
                          <div className="space-y-1 text-sm">
                            <p>Start: {task.currentStart.toLocaleDateString()}</p>
                            <p>End: {task.currentEnd.toLocaleDateString()}</p>
                            <p className="text-muted-foreground">
                              (Adjusted based on actual progress)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
