"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";
import { Checkbox } from "@/components/ui/Checkbox";

import { Plus, Trash2, Edit, Save, Copy, Calendar, BarChart3, Table as TableIcon, Settings, MapPin, Building, Users, FileText, DollarSign, Clock, AlertTriangle, CheckCircle, Eye, Download, Upload, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedTableBuilder } from "./EnhancedTableBuilder";
import { GanttChart } from "./GanttChart";

interface TableConfig {
  id: string;
  name: string;
  description: string;
  columns: any[];
  rows: any[];
  settings: any;
}

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

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'gantt' | 'mixed';
  category: 'real-estate' | 'construction' | 'property-management' | 'development' | 'custom';
  tables: TableConfig[];
  ganttTasks: GanttTask[];
  settings: TemplateSettings;
  createdAt: string;
  updatedAt: string;
}

interface TemplateSettings {
  allowCustomization: boolean;
  enableGanttConversion: boolean;
  enableDataImport: boolean;
  enableDataExport: boolean;
  enableCollaboration: boolean;
  enableVersioning: boolean;
  enableTemplates: boolean;
  defaultView: 'table' | 'gantt' | 'mixed';
  autoSave: boolean;
  enableNotifications: boolean;
}

interface TemplateBuilderProps {
  onSaveTemplate: (template: ProjectTemplate) => void;
  onClose: () => void;
  className?: string;
}

const REAL_ESTATE_CATEGORIES = {
  'real-estate': {
    name: 'Real Estate Development',
    icon: '🏗️',
    description: 'Property development, acquisition, and management',
    color: 'bg-blue-100 text-blue-800'
  },
  'construction': {
    name: 'Construction Management',
    icon: '🔨',
    description: 'Construction projects, contractors, and progress tracking',
    color: 'bg-green-100 text-green-800'
  },
  'property-management': {
    name: 'Property Management',
    icon: '🏢',
    description: 'Property operations, maintenance, and tenant management',
    color: 'bg-purple-100 text-purple-800'
  },
  'development': {
    name: 'Development Planning',
    icon: '📋',
    description: 'Project planning, permits, and regulatory compliance',
    color: 'bg-orange-100 text-orange-800'
  },
  'custom': {
    name: 'Custom Template',
    icon: '⚙️',
    description: 'Fully customizable template for any use case',
    color: 'bg-gray-100 text-gray-800'
  }
};

const PREBUILT_TEMPLATES = {
  'property-development': {
    name: 'Property Development Pipeline',
    description: 'Complete property development workflow from acquisition to sale',
    category: 'real-estate',
    type: 'mixed',
    tables: [
      {
        name: 'Properties',
        description: 'Property portfolio and development pipeline',
        columns: [
          { type: 'property', name: 'Property Address', required: true },
          { type: 'area', name: 'Lot Size (sq ft)', required: true, unit: 'sq ft' },
          { type: 'area', name: 'Building Area (sq ft)', required: true, unit: 'sq ft' },
          { type: 'select', name: 'Property Type', options: ['Residential', 'Commercial', 'Mixed-Use', 'Industrial'], required: true },
          { type: 'number', name: 'Units', required: true },
          { type: 'currency', name: 'Purchase Price', required: true, unit: 'USD' },
          { type: 'currency', name: 'Development Cost', required: true, unit: 'USD' },
          { type: 'currency', name: 'Expected Sale Price', required: true, unit: 'USD' },
          { type: 'percentage', name: 'ROI', required: true },
          { type: 'status', name: 'Project Status', options: ['Planning', 'Permitting', 'Construction', 'Marketing', 'Sold'], required: true },
          { type: 'progress', name: 'Progress %', required: true },
          { type: 'contact', name: 'Project Manager', required: true },
          { type: 'company', name: 'General Contractor', required: false },
          { type: 'date', name: 'Purchase Date', required: true },
          { type: 'date', name: 'Construction Start', required: true },
          { type: 'date', name: 'Construction End', required: true },
          { type: 'date', name: 'Sale Date', required: true }
        ]
      },
      {
        name: 'Permits & Approvals',
        description: 'Track all permits and regulatory approvals',
        columns: [
          { type: 'permit', name: 'Permit Type', required: true },
          { type: 'text', name: 'Permit Number', required: true },
          { type: 'date', name: 'Application Date', required: true },
          { type: 'date', name: 'Approval Date', required: false },
          { type: 'date', name: 'Expiration Date', required: false },
          { type: 'currency', name: 'Permit Fee', required: true, unit: 'USD' },
          { type: 'status', name: 'Status', options: ['Applied', 'Under Review', 'Approved', 'Rejected', 'Expired'], required: true },
          { type: 'contact', name: 'Contact Person', required: true },
          { type: 'company', name: 'Issuing Agency', required: true },
          { type: 'file', name: 'Documents', required: false }
        ]
      }
    ],
    ganttTasks: [
      {
        name: 'Property Acquisition',
        startDate: '2024-01-01',
        endDate: '2024-02-15',
        duration: 45,
        dependencies: [],
        status: 'completed',
        progress: 100
      },
      {
        name: 'Due Diligence',
        startDate: '2024-01-15',
        endDate: '2024-03-01',
        duration: 45,
        dependencies: ['Property Acquisition'],
        status: 'completed',
        progress: 100
      },
      {
        name: 'Permit Applications',
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        duration: 90,
        dependencies: ['Due Diligence'],
        status: 'in-progress',
        progress: 75
      },
      {
        name: 'Construction Planning',
        startDate: '2024-03-01',
        endDate: '2024-05-15',
        duration: 75,
        dependencies: ['Permit Applications'],
        status: 'not-started',
        progress: 0
      },
      {
        name: 'Construction Phase',
        startDate: '2024-05-15',
        endDate: '2024-12-31',
        duration: 230,
        dependencies: ['Construction Planning'],
        status: 'not-started',
        progress: 0
      },
      {
        name: 'Marketing & Sales',
        startDate: '2024-10-01',
        endDate: '2025-03-31',
        duration: 180,
        dependencies: ['Construction Phase'],
        status: 'not-started',
        progress: 0
      }
    ]
  },
  'construction-management': {
    name: 'Construction Project Management',
    description: 'Comprehensive construction project tracking and management',
    category: 'construction',
    type: 'mixed',
    tables: [
      {
        name: 'Construction Tasks',
        description: 'Detailed construction task breakdown',
        columns: [
          { type: 'task', name: 'Task Name', required: true },
          { type: 'phase', name: 'Phase', options: ['Pre-Construction', 'Foundation', 'Framing', 'MEP', 'Finishing', 'Punch List'], required: true },
          { type: 'gantt_start', name: 'Start Date', required: true },
          { type: 'gantt_end', name: 'End Date', required: true },
          { type: 'gantt_duration', name: 'Duration (days)', required: true },
          { type: 'gantt_dependencies', name: 'Dependencies', required: false },
          { type: 'contractor', name: 'Contractor', required: true },
          { type: 'currency', name: 'Budget', required: true, unit: 'USD' },
          { type: 'currency', name: 'Actual Cost', required: false, unit: 'USD' },
          { type: 'progress', name: 'Progress %', required: true },
          { type: 'status', name: 'Status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'], required: true },
          { type: 'priority', name: 'Priority', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
          { type: 'contact', name: 'Supervisor', required: true },
          { type: 'file', name: 'Documents', required: false }
        ]
      },
      {
        name: 'Vendor Management',
        description: 'Contractors, suppliers, and service providers',
        columns: [
          { type: 'company', name: 'Company Name', required: true },
          { type: 'contact', name: 'Primary Contact', required: true },
          { type: 'email', name: 'Email', required: true },
          { type: 'phone', name: 'Phone', required: true },
          { type: 'address', name: 'Address', required: true },
          { type: 'select', name: 'Vendor Type', options: ['General Contractor', 'Subcontractor', 'Supplier', 'Consultant', 'Service Provider'], required: true },
          { type: 'select', name: 'Specialization', options: ['Electrical', 'Plumbing', 'HVAC', 'Flooring', 'Roofing', 'Landscaping', 'Concrete', 'Steel', 'Other'], required: true },
          { type: 'status', name: 'Status', options: ['Active', 'Inactive', 'Pending Approval', 'Blacklisted'], required: true },
          { type: 'rating', name: 'Rating', required: false },
          { type: 'currency', name: 'Total Contracts', required: false, unit: 'USD' },
          { type: 'date', name: 'Last Used', required: false },
          { type: 'file', name: 'Certificates', required: false }
        ]
      }
    ],
    ganttTasks: []
  }
};

export function EnhancedTemplateBuilder({ onSaveTemplate, onClose, className }: TemplateBuilderProps) {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateType, setTemplateType] = useState<'table' | 'gantt' | 'mixed'>('mixed');
  const [templateCategory, setTemplateCategory] = useState<'real-estate' | 'construction' | 'property-management' | 'development' | 'custom'>('real-estate');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Table builder state
  const [tables, setTables] = useState<TableConfig[]>([]);
  const [currentTable, setCurrentTable] = useState<string | null>(null);
  
  // Gantt builder state
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>([]);
  
  // Settings state
  const [settings, setSettings] = useState<TemplateSettings>({
    allowCustomization: true,
    enableGanttConversion: true,
    enableDataImport: true,
    enableDataExport: true,
    enableCollaboration: true,
    enableVersioning: true,
    enableTemplates: true,
    defaultView: 'mixed',
    autoSave: true,
    enableNotifications: true
  });

  const addTable = () => {
    const newTable: TableConfig = {
      id: `table-${Date.now()}`,
      name: `Table ${tables.length + 1}`,
      description: '',
      columns: [
        { id: 'col-1', name: 'Task', type: 'text', required: true },
        { id: 'col-2', name: 'Status', type: 'status', required: true }
      ],
      rows: [],
      settings: {
        allowAddRows: true,
        allowEditRows: true,
        allowDeleteRows: true,
        showRowNumbers: true,
        showColumnHeaders: true,
        enableSorting: true,
        enableFiltering: true,
        enableSearch: true,
        enablePagination: true,
        pageSize: 25,
        autoSave: true,
        enableExport: true,
        enableImport: true,
        enableGanttConversion: true
      }
    };
    setTables(prev => [...prev, newTable]);
    setCurrentTable(newTable.id);
  };

  const updateTable = (tableId: string, updates: Partial<TableConfig>) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, ...updates } : table
    ));
  };

  const removeTable = (tableId: string) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    if (currentTable === tableId) {
      setCurrentTable(null);
    }
  };

  const addGanttTask = () => {
    const newTask: GanttTask = {
      id: `task-${Date.now()}`,
      name: 'New Task',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: 7,
      dependencies: [],
      status: 'not-started',
      progress: 0,
      forecastedStart: new Date().toISOString().split('T')[0],
      forecastedEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    setGanttTasks(prev => [...prev, newTask]);
  };

  const updateGanttTask = (taskId: string, updates: Partial<GanttTask>) => {
    setGanttTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const removeGanttTask = (taskId: string) => {
    setGanttTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const applyPrebuiltTemplate = (templateKey: string) => {
    const template = PREBUILT_TEMPLATES[templateKey as keyof typeof PREBUILT_TEMPLATES];
    if (template) {
      setTemplateName(template.name);
      setTemplateDescription(template.description);
      setTemplateType(template.type as any);
      setTemplateCategory(template.category as any);
      
      if (template.tables) {
        const processedTables = template.tables.map((table, index) => ({
          id: `table-${Date.now()}-${index}`,
          name: table.name,
          description: table.description,
          columns: table.columns.map((col, colIndex) => ({
            id: `col-${Date.now()}-${index}-${colIndex}`,
            ...col
          })),
          rows: [],
          settings: {
            allowAddRows: true,
            allowEditRows: true,
            allowDeleteRows: true,
            showRowNumbers: true,
            showColumnHeaders: true,
            enableSorting: true,
            enableFiltering: true,
            enableSearch: true,
            enablePagination: true,
            pageSize: 25,
            autoSave: true,
            enableExport: true,
            enableImport: true,
            enableGanttConversion: true
          }
        }));
        setTables(processedTables);
      }
      
      if (template.ganttTasks) {
        const processedTasks = template.ganttTasks.map((task, index) => ({
          id: `task-${Date.now()}-${index}`,
          ...task,
          status: task.status as 'not-started' | 'in-progress' | 'completed' | 'delayed'
        }));
        setGanttTasks(processedTasks);
      }
    }
  };

  const handleConvertToGantt = (ganttData: any) => {
    // Convert table data to Gantt tasks
    const newTasks = ganttData.tasks.map((task: any) => ({
      id: task.id,
      name: task.name,
      startDate: task.startDate,
      endDate: task.endDate,
      duration: task.duration,
      dependencies: task.dependencies || [],
      status: task.status || 'not-started',
      progress: task.progress || 0,
      forecastedStart: task.startDate,
      forecastedEnd: task.endDate
    }));
    
    setGanttTasks(prev => [...prev, ...newTasks]);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    const template: ProjectTemplate = {
      id: `template-${Date.now()}`,
      name: templateName,
      description: templateDescription,
      type: templateType,
      category: templateCategory,
      tables,
      ganttTasks,
      settings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveTemplate(template);
    onClose();
  };

  const getCategoryInfo = (category: string) => {
    return REAL_ESTATE_CATEGORIES[category as keyof typeof REAL_ESTATE_CATEGORIES] || REAL_ESTATE_CATEGORIES.custom;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Template Builder</h2>
          <p className="text-muted-foreground">Create comprehensive real estate development templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveTemplate} disabled={!templateName.trim()}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Template Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Template Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label htmlFor="template-category">Category</Label>
              <Select value={templateCategory} onValueChange={(value: any) => setTemplateCategory(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(REAL_ESTATE_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="template-type">Template Type</Label>
              <Select value={templateType} onValueChange={(value: any) => setTemplateType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table Only</SelectItem>
                  <SelectItem value="gantt">Gantt Chart Only</SelectItem>
                  <SelectItem value="mixed">Mixed (Table + Gantt)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getCategoryInfo(templateCategory).color}>
                {getCategoryInfo(templateCategory).name}
              </Badge>
            </div>
          </div>
          <div>
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Describe this template..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Prebuilt Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Prebuilt Real Estate Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(PREBUILT_TEMPLATES).map(([key, template]) => (
              <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryInfo(template.category).icon}</span>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Tables:</span>
                      <span>{template.tables?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tasks:</span>
                      <span>{template.ganttTasks?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <Badge className={getCategoryInfo(template.category).color}>
                        {getCategoryInfo(template.category).name}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => applyPrebuiltTemplate(key)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Builder Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{templateType.toUpperCase()}</Badge>
                  <Badge className={getCategoryInfo(templateCategory).color}>
                    {getCategoryInfo(templateCategory).name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {tables.length} tables, {ganttTasks.length} tasks
                  </span>
                </div>
                {templateName && (
                  <div>
                    <h3 className="font-medium">{templateName}</h3>
                    <p className="text-sm text-muted-foreground">{templateDescription}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Table Builder</h3>
            <Button onClick={addTable}>
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </div>

          {tables.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <TableIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No tables created yet</p>
                <Button onClick={addTable}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Table
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tables.map((table) => (
                <EnhancedTableBuilder
                  key={table.id}
                  table={table}
                  onUpdate={(updates) => updateTable(table.id, updates)}
                  onDelete={() => removeTable(table.id)}
                  onConvertToGantt={handleConvertToGantt}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="gantt" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Gantt Chart Builder</h3>
            <Button onClick={addGanttTask}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          {ganttTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No tasks created yet</p>
                <Button onClick={addGanttTask}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            <GanttChart
              tasks={ganttTasks}
              onTaskUpdate={(taskId, updates) => updateGanttTask(taskId, updates)}
            />
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Features</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allow-customization"
                        checked={settings.allowCustomization}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowCustomization: !!checked }))}
                      />
                      <Label htmlFor="allow-customization">Allow Customization</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-gantt-conversion"
                        checked={settings.enableGanttConversion}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableGanttConversion: !!checked }))}
                      />
                      <Label htmlFor="enable-gantt-conversion">Enable Gantt Conversion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-data-import"
                        checked={settings.enableDataImport}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableDataImport: !!checked }))}
                      />
                      <Label htmlFor="enable-data-import">Enable Data Import</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-data-export"
                        checked={settings.enableDataExport}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableDataExport: !!checked }))}
                      />
                      <Label htmlFor="enable-data-export">Enable Data Export</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Collaboration</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-collaboration"
                        checked={settings.enableCollaboration}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableCollaboration: !!checked }))}
                      />
                      <Label htmlFor="enable-collaboration">Enable Collaboration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-versioning"
                        checked={settings.enableVersioning}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableVersioning: !!checked }))}
                      />
                      <Label htmlFor="enable-versioning">Enable Versioning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-notifications"
                        checked={settings.enableNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableNotifications: !!checked }))}
                      />
                      <Label htmlFor="enable-notifications">Enable Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="auto-save"
                        checked={settings.autoSave}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSave: !!checked }))}
                      />
                      <Label htmlFor="auto-save">Auto Save</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{templateName || 'Untitled Template'}</h3>
                  <p className="text-muted-foreground">{templateDescription || 'No description provided'}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border rounded">
                    <TableIcon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="font-medium">{tables.length}</div>
                    <div className="text-sm text-muted-foreground">Tables</div>
                  </div>
                  <div className="p-4 border rounded">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="font-medium">{ganttTasks.length}</div>
                    <div className="text-sm text-muted-foreground">Tasks</div>
                  </div>
                  <div className="p-4 border rounded">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="font-medium">{templateType}</div>
                    <div className="text-sm text-muted-foreground">Type</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
