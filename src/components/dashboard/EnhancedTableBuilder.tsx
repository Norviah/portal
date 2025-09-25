"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";

import { Plus, Trash2, Edit, Save, Copy, Calendar, BarChart3, Table as TableIcon, Settings, ArrowRight, RefreshCw, Download, Upload, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { ColumnTypeSelector, ColumnConfig, ColumnType } from "./ColumnTypeSelector";

interface TableRow {
  id: string;
  data: Record<string, any>;
}

interface TableConfig {
  id: string;
  name: string;
  description: string;
  columns: ColumnConfig[];
  rows: TableRow[];
  settings: TableSettings;
}

interface TableSettings {
  allowAddRows: boolean;
  allowEditRows: boolean;
  allowDeleteRows: boolean;
  showRowNumbers: boolean;
  showColumnHeaders: boolean;
  enableSorting: boolean;
  enableFiltering: boolean;
  enableSearch: boolean;
  enablePagination: boolean;
  pageSize: number;
  autoSave: boolean;
  enableExport: boolean;
  enableImport: boolean;
  enableGanttConversion: boolean;
  ganttMapping?: GanttMapping;
}

interface GanttMapping {
  taskNameColumn: string;
  startDateColumn: string;
  endDateColumn: string;
  durationColumn: string;
  dependenciesColumn: string;
  statusColumn: string;
  progressColumn: string;
  assigneeColumn: string;
  priorityColumn: string;
}

interface EnhancedTableBuilderProps {
  table: TableConfig;
  onUpdate: (updates: Partial<TableConfig>) => void;
  onDelete: () => void;
  onConvertToGantt?: (ganttData: any) => void;
  className?: string;
}

const REAL_ESTATE_TEMPLATES = {
  'Property Development': {
    name: 'Property Development',
    description: 'Track property development projects from acquisition to sale',
    columns: [
      { type: 'property', name: 'Property Address', required: true, description: 'Full property address' },
      { type: 'area', name: 'Lot Size (sq ft)', required: true, unit: 'sq ft', description: 'Total lot size' },
      { type: 'area', name: 'Building Area (sq ft)', required: true, unit: 'sq ft', description: 'Total building area' },
      { type: 'select', name: 'Property Type', options: ['Residential', 'Commercial', 'Mixed-Use', 'Industrial'], required: true },
      { type: 'number', name: 'Units', required: true, description: 'Number of units' },
      { type: 'currency', name: 'Purchase Price', required: true, unit: 'USD', description: 'Property purchase price' },
      { type: 'currency', name: 'Development Cost', required: true, unit: 'USD', description: 'Total development cost' },
      { type: 'currency', name: 'Expected Sale Price', required: true, unit: 'USD', description: 'Expected sale price' },
      { type: 'percentage', name: 'ROI', required: true, description: 'Expected return on investment' },
      { type: 'date', name: 'Purchase Date', required: true, description: 'Date of property purchase' },
      { type: 'date', name: 'Construction Start', required: true, description: 'Construction start date' },
      { type: 'date', name: 'Construction End', required: true, description: 'Construction end date' },
      { type: 'date', name: 'Sale Date', required: true, description: 'Expected sale date' },
      { type: 'status', name: 'Project Status', options: ['Planning', 'Permitting', 'Construction', 'Marketing', 'Sold'], required: true },
      { type: 'progress', name: 'Progress %', required: true, description: 'Overall project progress' },
      { type: 'contact', name: 'Project Manager', required: true, description: 'Assigned project manager' },
      { type: 'company', name: 'General Contractor', required: false, description: 'Primary contractor' },
      { type: 'risk', name: 'Risks', required: false, description: 'Identified project risks' },
      { type: 'issue', name: 'Issues', required: false, description: 'Current project issues' }
    ]
  },
  'Construction Management': {
    name: 'Construction Management',
    description: 'Manage construction tasks, phases, and progress',
    columns: [
      { type: 'task', name: 'Task Name', required: true, description: 'Task description' },
      { type: 'phase', name: 'Phase', options: ['Pre-Construction', 'Foundation', 'Framing', 'MEP', 'Finishing', 'Punch List'], required: true },
      { type: 'gantt_start', name: 'Start Date', required: true, description: 'Task start date' },
      { type: 'gantt_end', name: 'End Date', required: true, description: 'Task end date' },
      { type: 'gantt_duration', name: 'Duration (days)', required: true, description: 'Task duration in days' },
      { type: 'gantt_dependencies', name: 'Dependencies', required: false, description: 'Task dependencies' },
      { type: 'contractor', name: 'Contractor', required: true, description: 'Assigned contractor' },
      { type: 'currency', name: 'Budget', required: true, unit: 'USD', description: 'Task budget' },
      { type: 'currency', name: 'Actual Cost', required: false, unit: 'USD', description: 'Actual cost incurred' },
      { type: 'progress', name: 'Progress %', required: true, description: 'Task completion percentage' },
      { type: 'status', name: 'Status', options: ['Not Started', 'In Progress', 'Completed', 'Delayed'], required: true },
      { type: 'priority', name: 'Priority', options: ['Low', 'Medium', 'High', 'Critical'], required: true },
      { type: 'risk', name: 'Risks', required: false, description: 'Task-specific risks' },
      { type: 'issue', name: 'Issues', required: false, description: 'Current issues' },
      { type: 'contact', name: 'Supervisor', required: true, description: 'Task supervisor' },
      { type: 'file', name: 'Documents', required: false, description: 'Related documents' }
    ]
  },
  'Permit Tracking': {
    name: 'Permit Tracking',
    description: 'Track all permits and approvals for the project',
    columns: [
      { type: 'permit', name: 'Permit Type', required: true, description: 'Type of permit' },
      { type: 'text', name: 'Permit Number', required: true, description: 'Permit reference number' },
      { type: 'date', name: 'Application Date', required: true, description: 'Date permit was applied for' },
      { type: 'date', name: 'Approval Date', required: false, description: 'Date permit was approved' },
      { type: 'date', name: 'Expiration Date', required: false, description: 'Permit expiration date' },
      { type: 'currency', name: 'Permit Fee', required: true, unit: 'USD', description: 'Permit application fee' },
      { type: 'status', name: 'Status', options: ['Applied', 'Under Review', 'Approved', 'Rejected', 'Expired'], required: true },
      { type: 'contact', name: 'Contact Person', required: true, description: 'Permit contact person' },
      { type: 'company', name: 'Issuing Agency', required: true, description: 'Government agency' },
      { type: 'file', name: 'Documents', required: false, description: 'Permit documents' },
      { type: 'text', name: 'Notes', required: false, description: 'Additional notes' },
      { type: 'date', name: 'Next Review Date', required: false, description: 'Next review date' },
      { type: 'contact', name: 'Reviewer', required: false, description: 'Permit reviewer' }
    ]
  },
  'Vendor Management': {
    name: 'Vendor Management',
    description: 'Manage vendors, suppliers, and contractors',
    columns: [
      { type: 'company', name: 'Company Name', required: true, description: 'Vendor company name' },
      { type: 'contact', name: 'Primary Contact', required: true, description: 'Main contact person' },
      { type: 'email', name: 'Email', required: true, description: 'Contact email' },
      { type: 'phone', name: 'Phone', required: true, description: 'Contact phone' },
      { type: 'address', name: 'Address', required: true, description: 'Company address' },
      { type: 'select', name: 'Vendor Type', options: ['General Contractor', 'Subcontractor', 'Supplier', 'Consultant', 'Service Provider'], required: true },
      { type: 'select', name: 'Specialization', options: ['Electrical', 'Plumbing', 'HVAC', 'Flooring', 'Roofing', 'Landscaping', 'Concrete', 'Steel', 'Other'], required: true },
      { type: 'status', name: 'Status', options: ['Active', 'Inactive', 'Pending Approval', 'Blacklisted'], required: true },
      { type: 'rating', name: 'Rating', required: false, description: 'Vendor performance rating' },
      { type: 'currency', name: 'Total Contracts', required: false, unit: 'USD', description: 'Total contract value' },
      { type: 'date', name: 'Last Used', required: false, description: 'Last project date' },
      { type: 'text', name: 'Notes', required: false, description: 'Vendor notes' },
      { type: 'file', name: 'Certificates', required: false, description: 'Insurance and certifications' }
    ]
  }
};

export function EnhancedTableBuilder({ table, onUpdate, onDelete, onConvertToGantt, className }: EnhancedTableBuilderProps) {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [showGanttMapping, setShowGanttMapping] = useState(false);
  const [ganttMapping, setGanttMapping] = useState<GanttMapping>({
    taskNameColumn: '',
    startDateColumn: '',
    endDateColumn: '',
    durationColumn: '',
    dependenciesColumn: '',
    statusColumn: '',
    progressColumn: '',
    assigneeColumn: '',
    priorityColumn: ''
  });

  const addColumn = () => {
    const newColumn: ColumnConfig = {
      id: `col-${Date.now()}`,
      name: 'New Column',
      type: 'text',
      required: false,
      description: ''
    };
    onUpdate({
      columns: [...table.columns, newColumn]
    });
  };

  const updateColumn = (columnId: string, updates: Partial<ColumnConfig>) => {
    onUpdate({
      columns: table.columns.map(col => 
        col.id === columnId ? { ...col, ...updates } : col
      )
    });
  };

  const removeColumn = (columnId: string) => {
    onUpdate({
      columns: table.columns.filter(col => col.id !== columnId)
    });
    if (selectedColumn === columnId) {
      setSelectedColumn(null);
    }
  };

  const addRow = () => {
    const newRow: TableRow = {
      id: `row-${Date.now()}`,
      data: table.columns.reduce((acc, col) => {
        acc[col.id] = getDefaultValue(col.type);
        return acc;
      }, {} as Record<string, any>)
    };
    onUpdate({
      rows: [...table.rows, newRow]
    });
  };

  const updateRowData = (rowId: string, columnId: string, value: any) => {
    onUpdate({
      rows: table.rows.map(row => 
        row.id === rowId 
          ? { ...row, data: { ...row.data, [columnId]: value } }
          : row
      )
    });
  };

  const removeRow = (rowId: string) => {
    onUpdate({
      rows: table.rows.filter(row => row.id !== rowId)
    });
  };

  const applyTemplate = (templateName: string) => {
    const template = REAL_ESTATE_TEMPLATES[templateName as keyof typeof REAL_ESTATE_TEMPLATES];
    if (template) {
      const columns = template.columns.map((col, index) => ({
        id: `col-${Date.now()}-${index}`,
        ...col,
        type: col.type as ColumnType
      }));
      onUpdate({
        name: template.name,
        description: template.description,
        columns
      });
    }
  };

  const getDefaultValue = (type: ColumnType) => {
    switch (type) {
      case 'number': return 0;
      case 'date': return new Date().toISOString().split('T')[0];
      case 'datetime': return new Date().toISOString();
      case 'time': return new Date().toTimeString().split(' ')[0];
      case 'checkbox': return false;
      case 'toggle': return false;
      case 'progress': return 0;
      case 'rating': return 0;
      case 'slider': return 0;
      case 'currency': return 0;
      case 'percentage': return 0;
      case 'area': return 0;
      case 'volume': return 0;
      case 'weight': return 0;
      case 'length': return 0;
      case 'duration': return 0;
      case 'gantt_duration': return 0;
      case 'multiselect': return [];
      default: return '';
    }
  };

  const renderCell = (row: TableRow, column: ColumnConfig) => {
    const value = row.data[column.id];
    
    switch (column.type) {
      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={(val) => updateRowData(row.id, column.id, val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'multiselect':
        return (
          <div className="flex flex-wrap gap-1">
            {value?.map((item: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <Checkbox
            checked={value || false}
            onCheckedChange={(checked) => updateRowData(row.id, column.id, checked)}
          />
        );
      
      case 'progress':
        return (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${value || 0}%` }}
            />
          </div>
        );
      
      case 'status':
        return (
          <Badge variant="outline" className="text-xs">
            {value || 'Not Set'}
          </Badge>
        );
      
      case 'currency':
        return (
          <span className="font-mono">
            {column.unit || '$'}{value || 0}
          </span>
        );
      
      case 'percentage':
        return (
          <span className="font-mono">
            {value || 0}%
          </span>
        );
      
      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => updateRowData(row.id, column.id, e.target.value)}
            className="w-full"
          />
        );
      
      case 'datetime':
        return (
          <Input
            type="datetime-local"
            value={value || ''}
            onChange={(e) => updateRowData(row.id, column.id, e.target.value)}
            className="w-full"
          />
        );
      
      case 'time':
        return (
          <Input
            type="time"
            value={value || ''}
            onChange={(e) => updateRowData(row.id, column.id, e.target.value)}
            className="w-full"
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => updateRowData(row.id, column.id, parseFloat(e.target.value) || 0)}
            className="w-full"
            min={column.min}
            max={column.max}
            step={column.step}
          />
        );
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateRowData(row.id, column.id, e.target.value)}
            className="w-full"
            placeholder={column.description}
          />
        );
    }
  };

  const canConvertToGantt = useMemo(() => {
    const hasStartDate = table.columns.some(col => col.type === 'gantt_start' || col.type === 'date');
    const hasEndDate = table.columns.some(col => col.type === 'gantt_end' || col.type === 'date');
    const hasTaskName = table.columns.some(col => col.type === 'task' || col.type === 'text');
    return hasStartDate && hasEndDate && hasTaskName;
  }, [table.columns]);

  const handleConvertToGantt = () => {
    if (!canConvertToGantt) return;
    
    const ganttData = {
      tasks: table.rows.map(row => ({
        id: row.id,
        name: row.data[ganttMapping.taskNameColumn] || 'Untitled Task',
        startDate: row.data[ganttMapping.startDateColumn] || new Date().toISOString().split('T')[0],
        endDate: row.data[ganttMapping.endDateColumn] || new Date().toISOString().split('T')[0],
        duration: row.data[ganttMapping.durationColumn] || 1,
        dependencies: row.data[ganttMapping.dependenciesColumn] || [],
        status: row.data[ganttMapping.statusColumn] || 'not-started',
        progress: row.data[ganttMapping.progressColumn] || 0,
        assignee: row.data[ganttMapping.assigneeColumn] || '',
        priority: row.data[ganttMapping.priorityColumn] || 'medium'
      }))
    };
    
    onConvertToGantt?.(ganttData);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="h-5 w-5" />
              <div>
                <CardTitle>{table.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{table.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowGanttMapping(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Convert to Gantt
              </Button>
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Table Design</h3>
                <Button onClick={addColumn}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Column
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Columns</h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {table.columns.map((column) => (
                      <Card
                        key={column.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          selectedColumn === column.id && "ring-2 ring-blue-500"
                        )}
                        onClick={() => setSelectedColumn(selectedColumn === column.id ? null : column.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {column.type}
                              </Badge>
                              <span className="font-medium">{column.name}</span>
                              {column.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeColumn(column.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {column.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {column.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Column Configuration</h4>
                  {selectedColumn ? (
                    <ColumnTypeSelector
                      column={table.columns.find(col => col.id === selectedColumn)!}
                      onUpdate={(updates) => updateColumn(selectedColumn, updates)}
                      onDelete={() => {
                        removeColumn(selectedColumn);
                        setSelectedColumn(null);
                      }}
                      availableColumns={table.columns}
                    />
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8">
                        <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Select a column to configure</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Table Data</h3>
                <Button onClick={addRow}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
                </Button>
              </div>

              {table.rows.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <TableIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No data rows yet</p>
                    <Button onClick={addRow}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Row
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {table.settings.showRowNumbers && <TableHead className="w-12">#</TableHead>}
                        {table.columns.map((column) => (
                          <TableHead key={column.id}>
                            <div className="flex items-center gap-2">
                              <span>{column.name}</span>
                              {column.required && <span className="text-red-500">*</span>}
                            </div>
                          </TableHead>
                        ))}
                        <TableHead className="w-12">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table.rows.map((row, index) => (
                        <TableRow key={row.id}>
                          {table.settings.showRowNumbers && (
                            <TableCell className="text-muted-foreground">
                              {index + 1}
                            </TableCell>
                          )}
                          {table.columns.map((column) => (
                            <TableCell key={column.id}>
                              {renderCell(row, column)}
                            </TableCell>
                          ))}
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRow(row.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h3 className="text-lg font-semibold">Table Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="table-name">Table Name</Label>
                    <Input
                      id="table-name"
                      value={table.name}
                      onChange={(e) => onUpdate({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="table-description">Description</Label>
                    <Textarea
                      id="table-description"
                      value={table.description}
                      onChange={(e) => onUpdate({ description: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Display Options</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-row-numbers"
                          checked={table.settings.showRowNumbers}
                          onCheckedChange={(checked) => 
                            onUpdate({ 
                              settings: { ...table.settings, showRowNumbers: !!checked } 
                            })
                          }
                        />
                        <Label htmlFor="show-row-numbers">Show Row Numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-column-headers"
                          checked={table.settings.showColumnHeaders}
                          onCheckedChange={(checked) => 
                            onUpdate({ 
                              settings: { ...table.settings, showColumnHeaders: !!checked } 
                            })
                          }
                        />
                        <Label htmlFor="show-column-headers">Show Column Headers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enable-sorting"
                          checked={table.settings.enableSorting}
                          onCheckedChange={(checked) => 
                            onUpdate({ 
                              settings: { ...table.settings, enableSorting: !!checked } 
                            })
                          }
                        />
                        <Label htmlFor="enable-sorting">Enable Sorting</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enable-filtering"
                          checked={table.settings.enableFiltering}
                          onCheckedChange={(checked) => 
                            onUpdate({ 
                              settings: { ...table.settings, enableFiltering: !!checked } 
                            })
                          }
                        />
                        <Label htmlFor="enable-filtering">Enable Filtering</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <h3 className="text-lg font-semibold">Real Estate Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(REAL_ESTATE_TEMPLATES).map(([key, template]) => (
                  <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          {template.columns.length} columns
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => applyTemplate(key)}
                        >
                          Apply Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Gantt Conversion Dialog */}
      <Dialog open={showGanttMapping} onOpenChange={setShowGanttMapping}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Convert Table to Gantt Chart</DialogTitle>
            <DialogDescription>
              Map your table columns to Gantt chart fields
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-name">Task Name Column</Label>
                <Select value={ganttMapping.taskNameColumn} onValueChange={(value) => setGanttMapping(prev => ({ ...prev, taskNameColumn: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {table.columns.map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="start-date">Start Date Column</Label>
                <Select value={ganttMapping.startDateColumn} onValueChange={(value) => setGanttMapping(prev => ({ ...prev, startDateColumn: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {table.columns.filter(col => col.type === 'date' || col.type === 'gantt_start').map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="end-date">End Date Column</Label>
                <Select value={ganttMapping.endDateColumn} onValueChange={(value) => setGanttMapping(prev => ({ ...prev, endDateColumn: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {table.columns.filter(col => col.type === 'date' || col.type === 'gantt_end').map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status Column</Label>
                <Select value={ganttMapping.statusColumn} onValueChange={(value) => setGanttMapping(prev => ({ ...prev, statusColumn: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {table.columns.filter(col => col.type === 'status').map((col) => (
                      <SelectItem key={col.id} value={col.id}>
                        {col.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowGanttMapping(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConvertToGantt}
                disabled={!ganttMapping.taskNameColumn || !ganttMapping.startDateColumn || !ganttMapping.endDateColumn}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Convert to Gantt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
