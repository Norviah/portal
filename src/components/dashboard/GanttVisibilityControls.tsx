"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import { 
  Eye, 
  EyeOff, 
  Settings, 
  Layers, 
  Filter, 
  Palette, 
  Layout, 
  RotateCcw,
  Save,
  Download,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisibilitySettings {
  forecasted: boolean;
  actual: boolean;
  current: boolean;
  variance: boolean;
  dependencies: boolean;
  progress: boolean;
  assignees: boolean;
  priorities: boolean;
  phases: boolean;
  categories: boolean;
  criticalPath: boolean;
  milestones: boolean;
  labels: boolean;
  grid: boolean;
  weekends: boolean;
  holidays: boolean;
}

interface ViewSettings {
  mode: 'separate' | 'overlay' | 'comparison' | 'variance';
  displayMode: 'timeline' | 'table' | 'kanban' | 'calendar';
  timelineScale: 'day' | 'week' | 'month' | 'quarter';
  opacity: number;
  height: number;
  compactMode: boolean;
  autoFit: boolean;
  showWeekends: boolean;
  showHolidays: boolean;
  showGrid: boolean;
  showLabels: boolean;
}

interface GanttVisibilityControlsProps {
  visibility: VisibilitySettings;
  viewSettings?: ViewSettings;
  onVisibilityChange: (visibility: VisibilitySettings) => void;
  onViewSettingsChange?: (settings: ViewSettings) => void;
  onReset?: () => void;
  onSavePreset?: (name: string) => void;
  onLoadPreset?: (name: string) => void;
  className?: string;
}

const VISIBILITY_PRESETS = {
  'default': {
    name: 'Default View',
    description: 'Standard Gantt chart view',
    settings: {
      forecasted: true,
      actual: true,
      current: true,
      variance: true,
      dependencies: true,
      progress: true,
      assignees: false,
      priorities: true,
      phases: false,
      categories: false,
      criticalPath: true,
      milestones: true,
      labels: true,
      grid: true,
      weekends: true,
      holidays: false
    }
  },
  'overlay': {
    name: 'Overlay Comparison',
    description: 'All timelines overlapping for comparison',
    settings: {
      forecasted: true,
      actual: true,
      current: true,
      variance: true,
      dependencies: false,
      progress: true,
      assignees: false,
      priorities: false,
      phases: false,
      categories: false,
      criticalPath: false,
      milestones: true,
      labels: false,
      grid: true,
      weekends: true,
      holidays: false
    }
  },
  'executive': {
    name: 'Executive Summary',
    description: 'High-level view for management',
    settings: {
      forecasted: true,
      actual: false,
      current: true,
      variance: false,
      dependencies: false,
      progress: true,
      assignees: false,
      priorities: true,
      phases: true,
      categories: true,
      criticalPath: true,
      milestones: true,
      labels: true,
      grid: false,
      weekends: false,
      holidays: false
    }
  },
  'detailed': {
    name: 'Detailed Analysis',
    description: 'Comprehensive view with all details',
    settings: {
      forecasted: true,
      actual: true,
      current: true,
      variance: true,
      dependencies: true,
      progress: true,
      assignees: true,
      priorities: true,
      phases: true,
      categories: true,
      criticalPath: true,
      milestones: true,
      labels: true,
      grid: true,
      weekends: true,
      holidays: true
    }
  },
  'variance': {
    name: 'Variance Analysis',
    description: 'Focus on schedule variances and delays',
    settings: {
      forecasted: false,
      actual: true,
      current: true,
      variance: true,
      dependencies: true,
      progress: true,
      assignees: false,
      priorities: true,
      phases: false,
      categories: false,
      criticalPath: true,
      milestones: false,
      labels: true,
      grid: true,
      weekends: true,
      holidays: false
    }
  }
};

export function GanttVisibilityControls({ 
  visibility, 
  viewSettings = {
    mode: 'overlay',
    displayMode: 'timeline',
    timelineScale: 'week',
    showWeekends: true,
    showHolidays: false,
    showGrid: true,
    showLabels: true,
    opacity: 0.8,
    height: 400,
    compactMode: false,
    autoFit: true
  }, 
  onVisibilityChange, 
  onViewSettingsChange = () => {}, 
  onReset = () => {}, 
  onSavePreset = () => {}, 
  onLoadPreset = () => {},
  className 
}: GanttVisibilityControlsProps) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [presetName, setPresetName] = useState('');

  const handlePresetChange = (presetKey: string) => {
    const preset = VISIBILITY_PRESETS[presetKey as keyof typeof VISIBILITY_PRESETS];
    if (preset) {
      onVisibilityChange(preset.settings);
    }
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSavePreset(presetName);
      setPresetName('');
    }
  };

  const getVisibilityCount = () => {
    return Object.values(visibility).filter(Boolean).length;
  };

  const getTotalCount = () => {
    return Object.keys(visibility).length;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Visibility Controls
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {getVisibilityCount()}/{getTotalCount()} visible
              </Badge>
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="layers">Layers</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="presets">Presets</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Timeline Views</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="forecasted"
                          checked={visibility.forecasted}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, forecasted: !!checked })}
                        />
                        <Label htmlFor="forecasted" className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-dashed bg-gray-200 rounded" />
                          Forecasted
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="actual"
                          checked={visibility.actual}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, actual: !!checked })}
                        />
                        <Label htmlFor="actual" className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-solid bg-blue-200 rounded" />
                          Actual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="current"
                          checked={visibility.current}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, current: !!checked })}
                        />
                        <Label htmlFor="current" className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-dotted bg-green-200 rounded" />
                          Current
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dependencies"
                          checked={visibility.dependencies}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, dependencies: !!checked })}
                        />
                        <Label htmlFor="dependencies">Dependencies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="criticalPath"
                          checked={visibility.criticalPath}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, criticalPath: !!checked })}
                        />
                        <Label htmlFor="criticalPath">Critical Path</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="milestones"
                          checked={visibility.milestones}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, milestones: !!checked })}
                        />
                        <Label htmlFor="milestones">Milestones</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">View Mode</h4>
                  <Select value={viewSettings.mode} onValueChange={(value: any) => onViewSettingsChange({ ...viewSettings, mode: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="separate">Separate Views</SelectItem>
                      <SelectItem value="overlay">Overlay Mode</SelectItem>
                      <SelectItem value="comparison">Side-by-Side</SelectItem>
                      <SelectItem value="variance">Variance Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layers" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Task Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="progress"
                          checked={visibility.progress}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, progress: !!checked })}
                        />
                        <Label htmlFor="progress">Progress Bars</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="assignees"
                          checked={visibility.assignees}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, assignees: !!checked })}
                        />
                        <Label htmlFor="assignees">Assignees</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="priorities"
                          checked={visibility.priorities}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, priorities: !!checked })}
                        />
                        <Label htmlFor="priorities">Priorities</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="phases"
                          checked={visibility.phases}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, phases: !!checked })}
                        />
                        <Label htmlFor="phases">Phases</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="categories"
                          checked={visibility.categories}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, categories: !!checked })}
                        />
                        <Label htmlFor="categories">Categories</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="labels"
                          checked={visibility.labels}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, labels: !!checked })}
                        />
                        <Label htmlFor="labels">Labels</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Grid & Calendar</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="grid"
                          checked={visibility.grid}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, grid: !!checked })}
                        />
                        <Label htmlFor="grid">Grid Lines</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="weekends"
                          checked={visibility.weekends}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, weekends: !!checked })}
                        />
                        <Label htmlFor="weekends">Weekends</Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="holidays"
                          checked={visibility.holidays}
                          onCheckedChange={(checked) => onVisibilityChange({ ...visibility, holidays: !!checked })}
                        />
                        <Label htmlFor="holidays">Holidays</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Timeline Scale</h4>
                  <Select value={viewSettings.timelineScale} onValueChange={(value: any) => onViewSettingsChange({ ...viewSettings, timelineScale: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="week">Weekly</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="quarter">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Chart Height</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[viewSettings.height]}
                      onValueChange={([value]) => onViewSettingsChange({ ...viewSettings, height: value })}
                      min={200}
                      max={800}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>200px</span>
                      <span>{viewSettings.height}px</span>
                      <span>800px</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Overlay Opacity</h4>
                  <div className="space-y-2">
                    <Slider
                      value={[viewSettings.opacity * 100]}
                      onValueChange={([value]) => onViewSettingsChange({ ...viewSettings, opacity: value / 100 })}
                      min={10}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>10%</span>
                      <span>{Math.round(viewSettings.opacity * 100)}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Display Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="compactMode"
                        checked={viewSettings.compactMode}
                        onCheckedChange={(checked) => onViewSettingsChange({ ...viewSettings, compactMode: !!checked })}
                      />
                      <Label htmlFor="compactMode">Compact Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoFit"
                        checked={viewSettings.autoFit}
                        onCheckedChange={(checked) => onViewSettingsChange({ ...viewSettings, autoFit: !!checked })}
                      />
                      <Label htmlFor="autoFit">Auto Fit</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="presets" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Quick Presets</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(VISIBILITY_PRESETS).map(([key, preset]) => (
                      <Button
                        key={key}
                        variant="outline"
                        className="justify-start h-auto p-3"
                        onClick={() => handlePresetChange(key)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{preset.name}</div>
                          <div className="text-xs text-muted-foreground">{preset.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Save Current View</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Preset name..."
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <Button size="sm" onClick={handleSavePreset} disabled={!presetName.trim()}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
