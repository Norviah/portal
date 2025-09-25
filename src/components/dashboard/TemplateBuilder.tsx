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

import { Plus, Trash2, Edit, Save, Copy, Calendar, BarChart3, Table as TableIcon, Settings, MapPin, Building, Users, FileText, DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnhancedTableBuilder } from "./EnhancedTableBuilder";
import { GanttChart } from "./GanttChart";

interface TableColumn {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'progress' | 'status';
  options?: string[];
  required?: boolean;
}

interface TableRow {
  id: string;
  data: Record<string, any>;
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
  tables: {
    id: string;
    name: string;
    columns: TableColumn[];
    rows: TableRow[];
  }[];
  ganttTasks: GanttTask[];
  createdAt: string;
  updatedAt: string;
}

interface TemplateBuilderProps {
  onSaveTemplate: (template: ProjectTemplate) => void;
  onClose: () => void;
  className?: string;
}

export function TemplateBuilder({ onSaveTemplate, onClose, className }: TemplateBuilderProps) {
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [templateType, setTemplateType] = useState<'table' | 'gantt' | 'mixed'>('mixed');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Table builder state
  const [tables, setTables] = useState<ProjectTemplate['tables']>([]);
  const [currentTable, setCurrentTable] = useState<string | null>(null);
  
  // Gantt builder state
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>([]);

  const addTable = () => {
    const newTable = {
      id: `table-${Date.now()}`,
      name: `Table ${tables.length + 1}`,
      columns: [
        { id: 'col-1', name: 'Task', type: 'text' as const, required: true },
        { id: 'col-2', name: 'Status', type: 'status' as const, required: true }
      ],
      rows: []
    };
    setTables(prev => [...prev, newTable]);
    setCurrentTable(newTable.id);
  };

  const updateTable = (tableId: string, updates: Partial<ProjectTemplate['tables'][0]>) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, ...updates } : table
    ));
  };

  const addColumn = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    const newColumn: TableColumn = {
      id: `col-${Date.now()}`,
      name: 'New Column',
      type: 'text',
      required: false
    };

    updateTable(tableId, {
      columns: [...table.columns, newColumn]
    });
  };

  const updateColumn = (tableId: string, columnId: string, updates: Partial<TableColumn>) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    updateTable(tableId, {
      columns: table.columns.map(col => 
        col.id === columnId ? { ...col, ...updates } : col
      )
    });
  };

  const removeColumn = (tableId: string, columnId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    updateTable(tableId, {
      columns: table.columns.filter(col => col.id !== columnId)
    });
  };

  const addRow = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    const newRow: TableRow = {
      id: `row-${Date.now()}`,
      data: table.columns.reduce((acc, col) => {
        acc[col.id] = col.type === 'number' ? 0 : col.type === 'date' ? new Date().toISOString().split('T')[0] : '';
        return acc;
      }, {} as Record<string, any>)
    };

    updateTable(tableId, {
      rows: [...table.rows, newRow]
    });
  };

  const updateRowData = (tableId: string, rowId: string, columnId: string, value: any) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    updateTable(tableId, {
      rows: table.rows.map(row => 
        row.id === rowId 
          ? { ...row, data: { ...row.data, [columnId]: value } }
          : row
      )
    });
  };

  const removeRow = (tableId: string, rowId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return;

    updateTable(tableId, {
      rows: table.rows.filter(row => row.id !== rowId)
    });
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

  const calculateCurrentLayout = (task: GanttTask) => {
    const forecastedStart = new Date(task.forecastedStart || task.startDate);
    const forecastedEnd = new Date(task.forecastedEnd || task.endDate);
    const actualStart = task.actualStart ? new Date(task.actualStart) : null;
    const actualEnd = task.actualEnd ? new Date(task.actualEnd) : null;

    if (actualStart && actualEnd) {
      // If we have both actual start and end, calculate variance
      const forecastedDuration = forecastedEnd.getTime() - forecastedStart.getTime();
      const actualDuration = actualEnd.getTime() - actualStart.getTime();
      const variance = actualDuration - forecastedDuration;
      
      // Current layout adjusts future tasks based on variance
      return {
        start: actualEnd,
        end: new Date(actualEnd.getTime() + forecastedDuration)
      };
    } else if (actualStart) {
      // If we only have actual start, adjust based on remaining forecasted duration
      const remainingDuration = forecastedEnd.getTime() - actualStart.getTime();
      return {
        start: actualStart,
        end: new Date(actualStart.getTime() + remainingDuration)
      };
    } else {
      // No actual data yet, use forecasted
      return {
        start: forecastedStart,
        end: forecastedEnd
      };
    }
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    const template: ProjectTemplate = {
      id: `template-${Date.now()}`,
      name: templateName,
      description: templateDescription,
      type: templateType,
      tables,
      ganttTasks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveTemplate(template);
    onClose();
  };

  const getColumnTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'number': return '🔢';
      case 'date': return '📅';
      case 'select': return '📋';
      case 'progress': return '📊';
      case 'status': return '🏷️';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Template Builder</h2>
          <p className="text-muted-foreground">Create reusable project templates</p>
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

      {/* Template Builder Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
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
                <Card key={table.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Input
                          value={table.name}
                          onChange={(e) => updateTable(table.id, { name: e.target.value })}
                          className="font-medium"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentTable(currentTable === table.id ? null : table.id)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTables(prev => prev.filter(t => t.id !== table.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {currentTable === table.id && (
                      <div className="space-y-4 mb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Columns</h4>
                          <Button size="sm" onClick={() => addColumn(table.id)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Column
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {table.columns.map((column) => (
                            <div key={column.id} className="flex items-center gap-2 p-2 border rounded">
                              <span className="text-lg">{getColumnTypeIcon(column.type)}</span>
                              <Input
                                value={column.name}
                                onChange={(e) => updateColumn(table.id, column.id, { name: e.target.value })}
                                className="flex-1"
                              />
                              <Select
                                value={column.type}
                                onValueChange={(value: any) => updateColumn(table.id, column.id, { type: value })}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="number">Number</SelectItem>
                                  <SelectItem value="date">Date</SelectItem>
                                  <SelectItem value="select">Select</SelectItem>
                                  <SelectItem value="progress">Progress</SelectItem>
                                  <SelectItem value="status">Status</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeColumn(table.id, column.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Data Rows</h4>
                        <Button size="sm" onClick={() => addRow(table.id)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Row
                        </Button>
                      </div>
                      {table.rows.length > 0 ? (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {table.columns.map((column) => (
                                <TableHead key={column.id}>{column.name}</TableHead>
                              ))}
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {table.rows.map((row) => (
                              <TableRow key={row.id}>
                                {table.columns.map((column) => (
                                  <TableCell key={column.id}>
                                    {column.type === 'select' ? (
                                      <Select
                                        value={row.data[column.id] || ''}
                                        onValueChange={(value) => updateRowData(table.id, row.id, column.id, value)}
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
                                    ) : column.type === 'status' ? (
                                      <Select
                                        value={row.data[column.id] || 'not-started'}
                                        onValueChange={(value) => updateRowData(table.id, row.id, column.id, value)}
                                      >
                                        <SelectTrigger className="w-full">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="not-started">Not Started</SelectItem>
                                          <SelectItem value="in-progress">In Progress</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="delayed">Delayed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    ) : (
                                      <Input
                                        type={column.type === 'number' ? 'number' : column.type === 'date' ? 'date' : 'text'}
                                        value={row.data[column.id] || ''}
                                        onChange={(e) => updateRowData(table.id, row.id, column.id, e.target.value)}
                                        className="w-full"
                                      />
                                    )}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeRow(table.id, row.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No data rows yet. Add some rows to populate the table.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
            <div className="space-y-4">
              {ganttTasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Input
                        value={task.name}
                        onChange={(e) => updateGanttTask(task.id, { name: e.target.value })}
                        className="font-medium"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGanttTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Forecasted Start</Label>
                        <Input
                          type="date"
                          value={task.forecastedStart || task.startDate}
                          onChange={(e) => updateGanttTask(task.id, { forecastedStart: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Forecasted End</Label>
                        <Input
                          type="date"
                          value={task.forecastedEnd || task.endDate}
                          onChange={(e) => updateGanttTask(task.id, { forecastedEnd: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Actual Start</Label>
                        <Input
                          type="date"
                          value={task.actualStart || ''}
                          onChange={(e) => updateGanttTask(task.id, { actualStart: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Actual End</Label>
                        <Input
                          type="date"
                          value={task.actualEnd || ''}
                          onChange={(e) => updateGanttTask(task.id, { actualEnd: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label>Status</Label>
                      <Select
                        value={task.status}
                        onValueChange={(value: any) => updateGanttTask(task.id, { status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-4">
                      <Label>Progress (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={task.progress}
                        onChange={(e) => updateGanttTask(task.id, { progress: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    {/* Current Layout Calculation */}
                    <div className="mt-4 p-3 bg-muted/50 rounded">
                      <h4 className="font-medium mb-2">Current Layout (Auto-calculated)</h4>
                      <div className="text-sm text-muted-foreground">
                        {(() => {
                          const current = calculateCurrentLayout(task);
                          return (
                            <div>
                              <p>Start: {current.start.toLocaleDateString()}</p>
                              <p>End: {current.end.toLocaleDateString()}</p>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
